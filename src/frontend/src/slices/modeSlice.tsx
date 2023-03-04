import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Modes = "home" | "practice" | "create-room" | "join-room";

export interface Mode {
    value: Modes;
}

const initialState = { value: "home" } as Mode;

const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<Modes>) => {
            state.value = action.payload;
        },
    },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
