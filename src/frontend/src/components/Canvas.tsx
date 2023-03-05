import React, { useRef } from "react";
import CanvasDraw from "react-canvas-draw";

const Canvas = () => {
    const canvasRef = useRef<CanvasDraw>(null);
    const canvasSize = 800;
    const radius = 10;

    return (
        <div id="canvas" className="p-0">
            <CanvasDraw
                ref={canvasRef}
                brushColor={"white"}
                canvasHeight={canvasSize}
                canvasWidth={canvasSize}
                backgroundColor={"black"}
                hideInterface={true}
                hideGrid={true}
                lazyRadius={0}
                brushRadius={radius}
                clampLinesToDocument={true}
            />
        </div>
    );
};

export default Canvas;
