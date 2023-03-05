import axios, { AxiosResponse } from "axios";
// require("dotenv").config();

const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL === undefined
        ? ""
        : process.env.REACT_APP_BACKEND_URL;

export async function predictImage(data: string) {
    var result = {
        label: "Waiting...",
        confidence: 0,
    };
    await axios
        .post(BACKEND_URL + "/predict", {
            data: data,
        })
        .then((res) => {
            result = res.data;
        });
    return result;
}

export function getRoomCode(): Promise<AxiosResponse<string, any>> {
    return axios.get<string>(BACKEND_URL + "/createRoom");
}

export function postRoomCode(roomCode: string): Promise<AxiosResponse<boolean, any>> {
    return axios.post<boolean>(BACKEND_URL + "/checkRoom", roomCode);
}
