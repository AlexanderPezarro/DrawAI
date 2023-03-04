import React from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { io, Socket } from "socket.io-client";


function App() {
    const mode = "home";
    const socket = io("http://localhost:22435");
    return (
        <div className="App">
            <header className="App-header">
                <span className="row">
                    <div>{mode}</div>
                    {mode === "home" && <Menu />}
                </span>
            </header>
        </div>
    );
}

export default App;
