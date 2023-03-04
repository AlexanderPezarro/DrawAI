import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function Menu() {
    return (
        <div>
            <div className="col-4">{mode}</div>
            <div className="col-4">
                <Button
                    as="a"
                    variant="primary"
                    onClick={() => {
                        toggleMode("practice");
                    }}
                >
                    Practice
                </Button>
                <Button
                    as="a"
                    variant="primary"
                    onClick={() => {
                        toggleMode("create-room");
                    }}
                >
                    Create Room
                </Button>
                <Button
                    as="a"
                    variant="primary"
                    onClick={() => {
                        toggleMode("join-room");
                    }}
                >
                    Join Room
                </Button>
            </div>
            <div className="col-4"></div>
        </div>
    );
}
