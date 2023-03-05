import React, { Component, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createRoomCode, setUsername } from "../../slices/modeSlice";
import Canvas from "../Canvas";
import Chat from "./Chat";
import Players from "./Players";

const Room: React.FC<{socket: Socket, roomCode?: string}> = (props) => {
    const dispatch = useAppDispatch();
    const roomCode = useAppSelector((state) => state.mode.room);

    useEffect(() => {
        if (roomCode === undefined) {
            dispatch(createRoomCode(props.socket));
        }
    }, [roomCode]);

    useEffect(() => {
        let username = localStorage.getItem('userName');
        while (username === "" ||  username === null) {
            console.log(username);
            const res = prompt("Please enter a username");
            if (res == null || res == "") {
                localStorage.setItem("userName", "");
            } else {
                localStorage.setItem("userName", res);
            }
            username = localStorage.getItem('userName');
        }
    }, []);

    return(
    <div className="d-flex min-vh-100">
        {/* Left: 0 */}
        <div className="mr-auto">
            <Players socket={props.socket}/>
        </div>

        {/* margin: auto */}
        <div className="">
            <Canvas />
        </div>

        {/* Right: 0 */}
        <div className="ml-auto">
            <Chat socket={props.socket}/>
        </div>
    </div>);
}

export default Room;