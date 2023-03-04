import React from "react";
import Button from "react-bootstrap/Button";
import CanvasDraw from "react-canvas-draw";
import predictImage from "../api/api";

const Practice = () => {
    let canvas: CanvasDraw | null;
    const canvasSize = 800;
    const imageSize = 28;

    const getCanvasImage = async function () {
        let string = canvas?.getSaveData();

        if (string === undefined) return;

        const data = JSON.parse(string);
        console.log(data);
        let grid: number[][] = [];

        for (var i: number = 0; i < imageSize; i++) {
            grid.push([]);
            for (var j: number = 0; j < imageSize; j++) {
                grid[i].push(0);
            }
        }
        const imageCanvas = document.createElement("canvas");
        const ctx = imageCanvas.getContext("2d");

        if (ctx === null) return;

        ctx.clearRect(0, 0, imageSize, imageSize);
        for (let line of data.lines) {
            for (let point of line.points) {
                let x = Math.floor((point.x / canvasSize) * imageSize);
                let y = Math.floor((point.y / canvasSize) * imageSize);

                if (x > -1 && x < imageSize && y > -1 && y < imageSize) {
                    grid[y][x] = 1;
                }
            }
        }

        console.log(grid);
        const result = await predictImage(grid);
        console.log(result);
    };

    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 center container">
                <div className="card">
                    <div className="row">
                        <CanvasDraw
                            ref={(canvasDraw) => (canvas = canvasDraw)}
                            className="border"
                            brushColor={"red"}
                            canvasHeight={canvasSize}
                            canvasWidth={canvasSize}
                            backgroundColor={"black"}
                            lazyRadius={0}
                        />
                    </div>
                    <div className="row">
                        <Button
                            className="button"
                            onClick={() => {
                                getCanvasImage();
                            }}
                        >
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
