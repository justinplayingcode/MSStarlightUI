import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, accountRole } from "model";
import authApi from "src/api";

interface CurrentUserState {
    role: accountRole | null;
    username: string | null;
    info: any;
    pending: boolean;
}

//call api and then change the role depend on the account role

const initialState: CurrentUserState = {
    role: null,
    username: null,
    info: {},
    pending: false
};

const getInfoCurrentUser = async () => {
    const res = await authApi.getInfoCurrentUser();

}

const getInfo = createAsyncThunk(
    'currentuser/getinfo',
    async () => {
        const { data } = await authApi.getInfoCurrentUser();
        console.log(data)
        return data;
    }
)

//save infomation of current log in user
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