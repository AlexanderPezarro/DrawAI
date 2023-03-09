import axios, { AxiosResponse } from "axios";

const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL === undefined
        ? "http://localhost:22435"
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
    console.log("Getting room code");
    return axios.get<string>(BACKEND_URL + "/createRoom");
}

export function postRoomCode(roomCode: string): Promise<AxiosResponse<string, any>> {
    console.log(`Checking room code: ${roomCode}`);
    return axios.post<string>(BACKEND_URL + "/checkRoom", {roomCode: roomCode});
}
