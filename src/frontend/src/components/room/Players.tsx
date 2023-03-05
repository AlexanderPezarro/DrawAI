import React, { Component, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const Players: React.FC<{socket: Socket}> = (props) => {
    const [players, setPlayers] = useState<string[]>(["alex"]);

    useEffect(() => {
        props.socket.on('joined', (username: string) => {
            console.log(`${JSON.stringify(username)} joined`);
            setPlayers([...players, username]);
            console.log(`Player ${username} joined`);
        });
        }, [props, players]);

    return(
    <div className="d-flex flex-column min-vh-100" style={{backgroundColor: "red"}}>
        <div className="flex-grow-0 d-flex flex-column justify-content-end mt-auto gap-2 h-100">
            {players.map((username: string) => (
                <span>{username}</span>
            ))}
        </div>
    </div>);
}

export default Players;
