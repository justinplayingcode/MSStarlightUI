import { createSlice } from "@reduxjs/toolkit";

interface navigationState {
    selectedMenu: string;
}

const initialState: navigationState = {
    selectedMenu: ''
};

export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        updateSelectedMenu: (state, action ) => {
            state.selectedMenu = action.payload;
        }
    },
});

export const { updateSelectedMenu } = navigationSlice.actions;

export default navigationSlice.reducer;