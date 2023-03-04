import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import CanvasDraw from "react-canvas-draw";
import predictImage from "../api/api";
import html2canvas from "html2canvas";

const Practice = () => {
    // let canvas: CanvasDraw | null;
    const canvasRef = useRef<CanvasDraw>(null);
    const canvasSize = 800;
    const imageSize = 28;
    const radius = 10;

    const convert = (n: number) => {
        var val = Math.floor((n / canvasSize) * imageSize);
        val = Math.max(0, Math.min(imageSize - 1, val));
        return val;
    };

    const getCanvasImage = async function () {
        const element = document.getElementById("canvas");
        if (element === null) return;
        var canvas = await html2canvas(element);
        var data = canvas.toDataURL("image/png");
        console.log(data);

        const result = await predictImage(data);
    };

    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 center container">
                <div className="card">
                    <div className="row">
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
                    </div>
                    <div className="row">
                        <Button className="button" onClick={getCanvasImage}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>
        </div>
    );
};

export default Practice;
