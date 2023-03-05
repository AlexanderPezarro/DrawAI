import React, { useState } from "react";
import { useAppDispatch } from "../hooks";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const Menu = () => {
    const dispatch = useAppDispatch();
    const [roomCode, setRoomCode] = useState("");
    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="d-grid col-1 gap-2">
                <Link to="/practice" className="mx-auto">
                    <Button
                        className="button"
                    >
                        Practice
                    </Button>
                </Link>
                <Link to="/create-room" className="mx-auto mb-3">
                    <Button
                        className="button"
                    >
                        Create Room
                    </Button>
                </Link>

                <hr/>

                <input className="mt-3" type="text" minLength={6} maxLength={6} pattern="^[A-Z]{6}$" value={roomCode} onChange={(e) => setRoomCode(e.target.value)}/>

                <Link to= {"/join-room/" + roomCode} className="mx-auto">
                    <Button className="button">
                        Join Room
                    </Button>
                </Link>
            </div>
        </div>
    );
};

// export default Menu;
