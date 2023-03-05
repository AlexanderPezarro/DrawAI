import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { checkRoomCode, createRoomCode } from "../../slices/modeSlice";
import { MessageResponse } from "../../types/types";

const Chat: React.FC<{socket: Socket}> = (props) => {
    const [messages, setMessages] = useState<MessageResponse[]>([{username: "alex", text: "Welcome to the game", id: "1"}]);
    const [message, setMessage] = useState('');
    const dispatch = useAppDispatch();
    const {roomCode} = useParams();
    const room = useAppSelector((state) => state.mode.room);
    const username = localStorage.getItem('userName');
    
    const handleSendMessage = (key: KeyboardEvent) => {
        if (key.key === "Enter" && message.trim()) {
            props.socket.emit('message', {
                text: message,
                username: username,
                roomCode: room,
                id: `${props.socket.id}${Math.random()}`,
                socketID: props.socket.id,
            });
            console.log("Sent message");
            setMessage('');
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleSendMessage);

        return () => {
            document.removeEventListener("keydown", handleSendMessage);
        }
    });

    useEffect(() => {
        props.socket.on('message', (data: MessageResponse) => {
            setMessages([...messages, data]);
            console.log(`Got message ${JSON.stringify(data)}`);
        });
        }, [props, messages]);

    useEffect(() => {
        console.log(`P: ${roomCode} S: ${room}`);
        if (roomCode === undefined && room === "") {
            dispatch(createRoomCode({username: username, socket: props.socket}));
        } else if (roomCode !== undefined) {
            dispatch(checkRoomCode({username: username, roomCode: roomCode, socket: props.socket}));
        }
    }, [room, roomCode]);

    return(
    <div className="d-flex flex-column min-vh-100" style={{backgroundColor: "red"}}>
        <div className="flex-grow-0 d-flex flex-column justify-content-end mt-auto gap-2 h-100">
            {messages.map((message: MessageResponse) => (
                <span key={message.id}>{message.username} {message.text}</span>
            ))}
        </div>
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
        </div>
    </div>);
}

export default Chat;