import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { predictImage } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createRoomCode } from "../../slices/modeSlice";
import { getCanvasImage } from "../../utils/utils";
import Canvas, { CanvasHandle } from "../Canvas";
import Chat from "./Chat";
import Players from "./Players";

const words = ["banana", "bat", "bed"];

const randomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

const Room: React.FC<{ socket: Socket; roomCode?: string }> = (props) => {
    const dispatch = useAppDispatch();
    const roomCode = useAppSelector((state) => state.mode.room);
    const [word, setWord] = useState(randomWord());
    const [match, setMatch] = useState(false);
    const canvasRef = useRef<CanvasHandle>(null);

    useEffect(() => {
        let username = localStorage.getItem("userName");
        while (username === "" || username === null) {
            console.log(username);
            const res = prompt("Please enter a username");
            if (res === null || res === "") {
                localStorage.setItem("userName", "");
            } else {
                localStorage.setItem("userName", res);
            }
            username = localStorage.getItem("userName");
        }
    }, []);

    const handleSubmit = async function () {
        const data = await getCanvasImage();
        const result = await predictImage(data);
        setMatch(result.label === word);
        console.log(match);
        canvasRef.current?.clear();
        setWord(randomWord());
    };

    return (
        <div className="row">
            <div className="col-2">
                <Players socket={props.socket} />
            </div>
            <div className="col-8">
                <div className="container">
                    <div className="row">
                        <h3 className="center">Target: {word}</h3>
                    </div>
                    <div className="center row">
                        <Canvas ref={canvasRef} />
                    </div>
                    <div className="row">
                        <Button className="button" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <div>Match: {match.toString()}</div>
                    </div>
                </div>
            </div>
            <div className="col-2">
                <Chat socket={props.socket} />
            </div>
        </div>
    );
};

export default Room;
