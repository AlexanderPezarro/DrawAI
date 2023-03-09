import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Canvas, { CanvasHandle } from "./Canvas";
import { getCanvasImage } from "../utils/utils";
import { predictImage } from "../api/api";

const Practice = () => {
    const canvasRef = useRef<CanvasHandle>(null);
    const [prediction, setPrediction] = useState({
        label: "Waiting...",
        confidence: 0,
    });

    const handleSubmit = async function () {
        const data = await getCanvasImage();
        const result = await predictImage(data);
        setPrediction(result);
        handleClear();
    };

    const handleClear = function () {
        canvasRef.current?.clear();
    };

    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 center container">
                <div className="card-body">
                    <div className="row m-3">
                        <Canvas ref={canvasRef} />
                    </div>
                    <div className="row m-3">
                        <div className="col-3 m-3"></div>
                        <div className="col-3 mt-1 mb-1 center">
                            <Button className="button" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                        <div className="col-3 mt-1 mb-1 center">
                            <Button className="button" onClick={handleClear}>
                                Clear
                            </Button>
                        </div>

                        <div className="col-3"></div>
                        <h4 className="center" style={{ color: "white" }}>
                            Prediction: {prediction.label} Confidence:
                            {prediction.confidence}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>
        </div>
    );
};

export default Practice;
