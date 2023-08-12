import { createSlice } from "@reduxjs/toolkit";
import { accountRole } from "../../model";

interface CurrentUserState {
    role: accountRole | null;
    username: string | null;
    info: any;
    pending: boolean;
}

const initialState: CurrentUserState = {
    role: null,
    username: null,
    info: {},
    pending: false
};

export const userSlice = createSlice({
    name: 'currentuser',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setInfoUser: (state, action) => {
            state.info = action.payload
        },
        userLogout: (state) => {
            state.role = null,
            state.username = null,
            state.info = null
        }
    }
})

export const { setRole, setUsername, setInfoUser, userLogout } = userSlice.actions;

export default userSlice.reducer;