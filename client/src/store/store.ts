import { configureStore, Store } from "@reduxjs/toolkit";
import rootSlice from "./slices/rootSlice";

const store: Store = configureStore({
    reducer: {
        app: rootSlice
    },
    devTools: import.meta.env.NODE_ENV
});

export type RootState = ReturnType<typeof store.getState>;
export default store;