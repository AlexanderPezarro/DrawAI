import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Socket } from "socket.io-client";
import { getRoomCode, postRoomCode } from "../api/api";

export const createRoomCode = createAsyncThunk<string, {username:string|null, socket:Socket}>(
    "createRoom/",
    async ({username, socket}, _) => {
      try {
        const response = await getRoomCode();
        socket.emit("join", {username: username, roomCode: response.data});
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  export const checkRoomCode = createAsyncThunk<string, {username:string|null, roomCode:string, socket:Socket}>(
    "checkRoom/",
    async ({username, roomCode, socket}, { dispatch }) => {
      try {
        const response: AxiosResponse<string, any> = await postRoomCode(roomCode);
        console.log(`checkRoomCode data: ${response.data}`)
        socket.emit("join", {username: username, roomCode: response.data});
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

export interface Mode {
    room: string;
    username: string;
    gameStarted: boolean;
}

const initialState: Mode = {
    room: "",
    username: "",
    gameStarted: false,
}

const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<string>) => {
            state.room = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.room = action.payload;
        },
        setStarted: (state) => {
          state.gameStarted = true;
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
        builder.addCase(checkRoomCode.fulfilled, (state, { payload }) => {
            console.log(`Checked room code ${payload}`);
            state.room = payload;
        });
        builder.addCase(checkRoomCode.rejected, (state, action) => {
            console.log(action.error);
        });
    },
});

export const { setRoom, setUsername, setStarted } = modeSlice.actions;
export default modeSlice.reducer;
