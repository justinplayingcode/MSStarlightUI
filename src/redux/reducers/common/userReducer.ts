import { createSlice } from "@reduxjs/toolkit";
import { accountRole } from "model";

interface CurrentUserState {
    role: accountRole | null;
    username: string;
    info: any;
}

const initialState: CurrentUserState = {
    role: null,
    username: '',
    info: {}
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
        }
    }
})

export const { setRole, setUsername, setInfoUser } = userSlice.actions;

export default userSlice.reducer;