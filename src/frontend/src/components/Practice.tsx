import React, { Component, useRef } from "react";
import CanvasDraw from "react-canvas-draw";

const Practice = () => {
    const canvas: React.MutableRefObject<null | CanvasDraw> = useRef(null);

    const getCanvasImage = () => {
        console.log(canvas.current?.getSaveData());
    };

    return (
        <div>
            <CanvasDraw ref={canvas} />
            <button
                className="button"
                onClick={() => {
                    console.log("yooo");
                    getCanvasImage();
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default Practice;
