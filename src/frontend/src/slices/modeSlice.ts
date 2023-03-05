import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
// import {io, Socket} from "socket.io-client"
import { getRoomCode } from "../api/api";
// import { ClientToServerEvents, ServerToClientEvents } from "../types/types";

export const createRoomCode = createAsyncThunk<string, Socket>(
    "createRoom/",
    async (socket, { dispatch }) => {
      try {
        const response = await getRoomCode();
        socket.emit("join", {username: "alex", roomCode: response.data});
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

type Modes = "home" | "practice" | "create-room" | "join-room";

export interface Mode {
    value: Modes;
    room: string;
    username: string;
}

const initialState: Mode = {
    value: "home",
    room: "",
    username: "",
}

const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<Modes>) => {
            state.value = action.payload;
        },
        setRoom: (state, action: PayloadAction<string>) => {
            state.room = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.room = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createRoomCode.fulfilled, (state, { payload }) => {
            console.log(`Got room code ${payload}`);
            state.room = payload;
        });
        builder.addCase(createRoomCode.rejected, (state, action) => {
            console.log(action.error);
        });
    },
});

export const { setMode, setRoom, setUsername } = modeSlice.actions;
export default modeSlice.reducer;
