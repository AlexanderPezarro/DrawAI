import React from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Practice from "./components/Practice";

import {io, Socket} from "socket.io-client";
import Room from "./components/room/Room";

function App() {
    const socket = io("http://localhost:22435");
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Menu />} />
                    <Route path="practice" element={<Practice />} />
                    <Route path="create-room" element={<Room socket={socket} isHost={true}/>} />
                    <Route path="join-room/:roomCode" element={<Room socket={socket} isHost={false}/>} />
                    <Route path="*" element={<Menu />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
