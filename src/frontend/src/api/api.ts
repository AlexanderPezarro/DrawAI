import axios from "axios";
// require("dotenv").config();

const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL === undefined
        ? ""
        : process.env.REACT_APP_BACKEND_URL;

export async function predictImage(data: string) {
    var result;
    await axios
        .post(BACKEND_URL + "/predict", {
            data: data,
        })
        .then((res) => {
            result = res.data;
        });
    return result;
}

const apiurl = "http://localhost:22435/";

export const getRoomCode = () => {
    console.log("Create room api call");
    return axios.get<string>(apiurl + "createRoom");
}