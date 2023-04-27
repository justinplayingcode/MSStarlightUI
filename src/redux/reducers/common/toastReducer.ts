import { createSlice } from "@reduxjs/toolkit";

interface toastState {
    selectedMenu: string;
    isShow: boolean;
}

const initialState: toastState = {
    selectedMenu: '',
    isShow: false
};

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showMessagerBar: (state, action ) => {
            state.isShow = true
            state.selectedMenu = action.payload;

        },
        closeMessagerBar: (state) => {
            state.isShow = false,
            state.selectedMenu = ""
        }
    },
});

export const { showMessagerBar, closeMessagerBar  } = toastSlice.actions;

export default toastSlice.reducer;