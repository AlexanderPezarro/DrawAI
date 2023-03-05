import { configureStore } from "@reduxjs/toolkit";
import modeSliceReducer from "./slices/modeSlice";

const store = configureStore({
    reducer: {
        mode: modeSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
