import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./slices/rootSlice";

const store = configureStore({
    reducer: {
        app: rootSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;