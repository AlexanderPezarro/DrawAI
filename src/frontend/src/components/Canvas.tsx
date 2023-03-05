import React, { useRef, useImperativeHandle, forwardRef } from "react";
import CanvasDraw from "react-canvas-draw";

type CanvasProps = {};

export type CanvasHandle = {
    clear: () => void;
};

const Canvas = forwardRef<CanvasHandle, CanvasProps>((props, ref) => {
    const canvasRef = useRef<CanvasDraw>(null);
    const canvasSize = 800;
    const radius = 10;

    useImperativeHandle(ref, () => ({
        clear() {
            canvasRef.current?.clear();
        },
    }));

    return (
        <div className="p-0 center">
            <div id="canvas">
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
        </div>
    );
});

export default Canvas;
