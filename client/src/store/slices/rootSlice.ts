import { createSlice } from "@reduxjs/toolkit";

interface StateInterface {
    isLoggedIn: boolean;
    user: {
        username: string;
        id: string;
        email: string;
        profilePic: string;
        token: string;
    }
}
const initialState: StateInterface = {
    isLoggedIn: false,
    user: {
        username: "",
        id: "",
        email: "",
        profilePic: "",
        token: ""
    }
}

const rootSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const appActions = rootSlice.actions;
export default rootSlice.reducer;