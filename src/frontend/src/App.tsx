import React from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Practice from "./components/Practice";

import { io, Socket } from "socket.io-client";
import Room from "./components/room/Room";

function App() {
    const socket = io("https://ahp9.host.cs.st-andrews.ac.uk");
    return (
        <div style={{ backgroundColor: "#2a363b" }} className="pt-5 pb-5">
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Menu />} />
                        <Route path="practice" element={<Practice />} />
                        <Route
                            path="create-room"
                            element={<Room socket={socket} isHost={true} />}
                        />
                        <Route
                            path="join-room/:roomCode"
                            element={<Room socket={socket} isHost={false} />}
                        />
                        <Route path="*" element={<Menu />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
