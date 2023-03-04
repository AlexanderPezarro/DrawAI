import axios from "axios"

const apiurl = "http://localhost:22435/";

export const getRoomCode = () => {
    console.log("Create room api call");
    return axios.get<string>(apiurl + "createRoom");
}