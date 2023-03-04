import predictImage from "../api/api";
import html2canvas from "html2canvas";

export const getCanvasImage = async function () {
    const element = document.getElementById("canvas");
    if (element === null) return "";
    var canvas = await html2canvas(element);
    var data = canvas.toDataURL("image/png");
    return data;
};
