import { createSlice } from "@reduxjs/toolkit";
import { accountRole } from "model";

interface CurrentUserState {
    role: accountRole | null;
    userId: string;
    avatar: string;
    info: any;
}

//call api and then change the role depend on the account role

const initialState: CurrentUserState = {
    role: accountRole.Admin,
    userId: '',
    avatar: 'https://res.cloudinary.com/dipiauw0v/image/upload/v1681015649/DATN/avatar_dexs0y.png',
    info: {
        name: 'Phạm Duy Thắng',
        dateOfBirth: new Date(2001, 1, 30),
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
        }
    }
})

export const { setRole, setUserId, setInfoUser } = userSlice.actions;

export default userSlice.reducer;