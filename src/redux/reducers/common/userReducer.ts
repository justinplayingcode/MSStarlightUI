import { createSlice } from "@reduxjs/toolkit";
import { accountRole } from "model";

interface CurrentUserState {
    role: accountRole | null;
    userId: string;
    info: any;
}

const initialState: CurrentUserState = {
    role: null,
    userId: '',
    info: {}
};

export const userSlice = createSlice({
    name: 'currentuser',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setInfoUser: (state, action) => {
            state.info = action.payload
        }
    }
})

export const { setRole, setUserId, setInfoUser } = userSlice.actions;

export default userSlice.reducer;