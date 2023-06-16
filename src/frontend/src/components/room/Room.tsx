import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { predictImage } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setStarted } from "../../slices/modeSlice";
import { getCanvasImage } from "../../utils/utils";
import Canvas, { CanvasHandle } from "../Canvas";
import Chat from "./Chat";
import Players from "./Players";

const Room: React.FC<{ socket: Socket; isHost: boolean }> = (props) => {
    const [isStarted, setIsStarted] = useState(false);
    const [words, setWords] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const [match, setMatch] = useState(false);
    const [won, setWon] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const canvasRef = useRef<CanvasHandle>(null);
    const dispatch = useAppDispatch();
    const room = useAppSelector((state) => state.mode.room);
    const [username, setUsername] = useState(localStorage.getItem("userName"));

    useEffect(() => {
        if (username === "" || username === null) {
            console.log(`Username: ${username}`);
            const res = prompt("Please enter a username");
            if (res === null || res === "") {
                localStorage.setItem("userName", "");
            } else {
                localStorage.setItem("userName", res);
            }
            setUsername(localStorage.getItem("userName"));
        }
    }, [username]);

    useEffect(() => {
        if (index >= 5) {
            props.socket.emit("game over", {
                roomCode: room,
                username: username,
            });
        }
    }, [index]);

    const handleSubmit = async function () {
        const data = await getCanvasImage();
        const result = await predictImage(data);
        if (result.label === words[index]) {
            setMatch(result.label === words[index]);
            setIndex(index + 1);
        }
        canvasRef.current?.clear();
    };

    const handleClear = function () {
        canvasRef.current?.clear();
    };

    useEffect(() => {
        props.socket.on("started", (prompts: string[]) => {
            setIsStarted(true);
            setWords([...words, ...prompts]);
            console.log(`Got prompts ${JSON.stringify(prompts)}`);
        });
    }, [props, words, isStarted]);

    useEffect(() => {
        props.socket.on("over", (winner: string) => {
            setGameOver(true);
            setWon(username === winner);
            console.log(`Game over, ${username === winner ? "won" : "lost"}`);
        });
    }, [props, gameOver, won]);

    const handleStart = () => {
        dispatch(setStarted({ roomCode: room, socket: props.socket }));
    };

    return (
        <div className="row m-5">
            <div
                className="col-2 card border"
                style={{ backgroundColor: "#f8b195", maxHeight: "60em" }}
            >
                <div className="mt-auto">
                    <Players socket={props.socket} />
                </div>
            </div>
            <div className="col-8">
                {isStarted && !gameOver && (
                    <div className="container">
                        <div className="row">
                            <h3 className="center" style={{ color: "white" }}>
                                Target: '{words[index]}'. Completed: {index}{" "}
                                prompts
                            </h3>
                        </div>
                        <div className="center row">
                            <Canvas ref={canvasRef} />
                        </div>
                        <div className="row m-3">
                            <div className="col-3 m-3"></div>
                            <div className="col-3 mt-1 mb-1 center">
                                <Button
                                    className="button"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                            <div className="col-3 mt-1 mb-1 center">
                                <Button
                                    className="button"
                                    onClick={handleClear}
                                >
                                    Clear
                                </Button>
                            </div>

                            <div className="col-3"></div>
                        </div>
                    </div>
                )}
                {!isStarted && props.isHost && !gameOver && (
                    <div className="container">
                        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                            <Button className="button" onClick={handleStart}>
                                Start Game
                            </Button>
                            <h2 style={{ color: "white" }}>
                                Room code: {room}
                            </h2>
                        </div>
                    </div>
                )}
                {!isStarted && !props.isHost && !gameOver && (
                    <div className="container">
                        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                            <h2 style={{ color: "white" }}>Waiting for host to start</h2>
                        </div>
                    </div>
                )}
                {gameOver && won && (
                    <div className="container">
                        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                            <h2 style={{ color: "white" }}>You won!!!</h2>
                            <Link to="/">
                                <Button className="button">Main Menu</Button>
                            </Link>
                        </div>
                    </div>
                )}
                {gameOver && !won && (
                    <div className="container">
                        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                            <h2 style={{ color: "white" }}>
                                You lost. Completed {index} prompts out of 5.
                            </h2>
                            <Link to="/">
                                <Button className="button">Main Menu</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div
                className="col-2 card border"
                style={{ backgroundColor: "#f8b195", maxHeight: "60em" }}
            >
                <div className="mt-auto">
                    <Chat socket={props.socket} />
                </div>
            </div>
        </div>
    );
};

export default Room;
