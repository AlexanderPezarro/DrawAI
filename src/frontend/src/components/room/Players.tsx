import React, { Component } from "react";
import { Socket } from "socket.io-client";

const Players: React.FC<{socket: Socket}> = (props) => {
    return(
    <div style={{backgroundColor: "blue"}}>
        World
    </div>);
}

export default Players;