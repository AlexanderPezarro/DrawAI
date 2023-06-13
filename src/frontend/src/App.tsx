import React, { useEffect, useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Practice from "./components/Practice";

import { io, Socket } from "socket.io-client";
import Room from "./components/room/Room";

function App() {
    const BACKEND_URL = process.env.REACT_APP_SOCKET_URL ?? "http://localhost:22435";
    const [socket, setSocket] = useState<Socket>(io());

    useEffect(() => {
        setSocket(io(BACKEND_URL));
        console.log("Created socket");
    }, [])

    useEffect(() => {
        socket.on("connected", () => {
            console.log("Socket connected");
            console.log(socket.id);
        })
        console.log(`Created socket-connected listener for socket ID-${socket.id}`);
    }, [socket])

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
