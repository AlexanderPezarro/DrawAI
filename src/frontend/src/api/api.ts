import axios from "axios";
// require("dotenv").config();

const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL === undefined
        ? ""
        : process.env.REACT_APP_BACKEND_URL;

async function predictImage(grid: number[][]) {
    var result;
    await axios
        .post(BACKEND_URL + "/predict", {
            grid: grid,
        })
        .then((res) => {
            result = res.data;
        });
    return result;
}

export default predictImage;
