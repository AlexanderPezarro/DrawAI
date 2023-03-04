import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setMode } from "../slices/modeSlice";
import Button from "react-bootstrap/Button";

export const Menu = () => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <div className="col-4">
                {useAppSelector((state) => state.mode.value)}
            </div>
            <div className="col-4">
                <Button
                    as="a"
                    variant="primary"
                    onClick={() => {
                        dispatch(setMode("practice"));
                    }}
                >
                    Practice
                </Button>
                <Button
                    as="a"
                    variant="primary"
                    onClick={() => {
                        dispatch(setMode("create-room"));
                    }}
                >
                    Create Room
                </Button>
                <Button
                    as="a"
                    variant="primary"
                    onClick={() => {
                        dispatch(setMode("join-room"));
                    }}
                >
                    Join Room
                </Button>
            </div>
            <div className="col-4"></div>
        </div>
    );
};

// export default Menu;
