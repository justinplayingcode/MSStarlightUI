import { createSlice } from "@reduxjs/toolkit";
import { accountRole } from "model";

interface CurrentUserState {
    role: accountRole | null;
    userId: string | null;
    avatar: string | null;
    info: any;
}

//call api and then change the role depend on the account role

const initialState: CurrentUserState = {
    role: null,
    userId: null,
    avatar: 'https://res.cloudinary.com/dipiauw0v/image/upload/v1681015649/DATN/avatar_dexs0y.png',
    info: {
        name: 'Phạm Duy Thắng',
        dateOfBirth: '2001, 1, 30',
    }
};

//save infomation of current log in user
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
        },
        userLogout: (state) => {
            state.role = null,
            state.userId = null,
            state.avatar = null,
            state.info = null
        }
    }
})

export const { setRole, setUserId, setInfoUser, userLogout } = userSlice.actions;

export default userSlice.reducer;