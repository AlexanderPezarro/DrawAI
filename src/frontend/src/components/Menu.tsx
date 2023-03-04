import React from "react";
import { useAppDispatch } from "../hooks";
import { setMode } from "../slices/modeSlice";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const Menu = () => {
    const dispatch = useAppDispatch();
    return (
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4 col">
                <Link to="/practice">
                    <Button
                        onClick={() => {
                            dispatch(setMode("practice"));
                        }}
                        className="button"
                    >
                        Practice
                    </Button>
                </Link>
                <Link to="/create-room">
                    <Button
                        onClick={() => {
                            dispatch(setMode("create-room"));
                        }}
                        className="button"
                    >
                        Create Room
                    </Button>
                </Link>
                <Link to="/join-room">
                    <Button
                        onClick={() => {
                            dispatch(setMode("join-room"));
                        }}
                        className="button"
                    >
                        Join Room
                    </Button>
                </Link>
            </div>
            <div className="col-4"></div>
        </div>
    );
};

// export default Menu;
