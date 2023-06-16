import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { checkRoomCode, createRoomCode } from "../../slices/modeSlice";
import { MessageResponse } from "../../types/types";

const Chat: React.FC<{ socket: Socket }> = (props) => {
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [message, setMessage] = useState("");
    const dispatch = useAppDispatch();
    const { roomCode: roomCodeParam } = useParams();
    const roomCodeState = useAppSelector((state) => state.mode.room);
    const username = localStorage.getItem("userName");

    const handleSendMessage = (key: KeyboardEvent) => {
        if (key.key === "Enter" && message.trim()) {
            props.socket.emit("message", {
                text: message,
                username: username,
                roomCode: roomCodeState,
                id: `${props.socket.id}${Math.random()}`,
                socketID: props.socket.id,
            });
            console.log("Sent message");
            setMessage("");
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleSendMessage);

        return () => {
            document.removeEventListener("keydown", handleSendMessage);
        };
    });

    useEffect(() => {
        const onMessage =(data: MessageResponse) => {
            setMessages([...messages, data]);
            console.log(`Got message ${JSON.stringify(data)}`);
        }

        props.socket.on("message", onMessage);

        return () => {
            props.socket.off("message", onMessage);
        }
    }, [props, messages]);

    useEffect(() => {
        console.log(`RoomCodeParam: ${roomCodeParam} RoomCodeState: ${roomCodeState}`);
        if (roomCodeParam === undefined && roomCodeState === "") {
            console.log("No roomCode, creating new room");
            dispatch(
                createRoomCode({ username: username, socket: props.socket })
            );
        } else if (roomCodeParam !== undefined && roomCodeState === "") {
            console.log("roomCode given, checking validity");
            dispatch(
                checkRoomCode({
                    username: username,
                    roomCode: roomCodeParam,
                    socket: props.socket,
                })
            );
        }
    }, [roomCodeState, roomCodeParam]);

    return (
        <div className="d-flex flex-column mb-5">
            <div className="flex-grow-0 d-flex flex-column justify-content-end mt-auto gap-2">
                {messages.map((message: MessageResponse) => (
                    <span key={message.id}>
                        <div>
                            <text style={{ color: "red" }}>
                                <b>{message.username}</b>
                            </text>
                            : {message.text}
                        </div>
                    </span>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Chat;
