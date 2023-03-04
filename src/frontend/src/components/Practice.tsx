import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Canvas from "./Canvas";
import { getCanvasImage } from "../utils/utils";
import predictImage from "../api/api";

const Practice = () => {
    const [prediction, setPrediction] = useState({
        label: "Waiting...",
        confidence: 0,
    });

    const handleSubmit = async function () {
        const data = await getCanvasImage();
        const result = await predictImage(data);
        setPrediction(result);
    };

    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 center container">
                <div className="card">
                    <div className="row">
                        <Canvas />
                    </div>
                    <div className="row">
                        <Button className="button" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <div>{JSON.stringify(prediction)}</div>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>
        </div>
    );
};

export default Practice;
