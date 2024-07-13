import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "app",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
})

export const appActions = rootSlice.actions;
export default rootSlice.reducer;