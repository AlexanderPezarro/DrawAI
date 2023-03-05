import React, { Component, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const Players: React.FC<{socket: Socket}> = (props) => {
    const [players, setPlayers] = useState<{username: string}[]>([{username: "alex"}]);

    useEffect(() => {
        props.socket.on('joined', (data: {username: string}) => {
            setPlayers([...players, data]);
            console.log(`Player ${data.username} joined`);
        });
        }, [props, players]);

    return(
    <div className="d-flex flex-column min-vh-100" style={{backgroundColor: "red"}}>
        <div className="flex-grow-0 d-flex flex-column justify-content-end mt-auto gap-2 h-100">
            {players.map((player: {username: string}) => (
                <span>{player.username}</span>
            ))}
        </div>
    </div>);
}

export default Players;
