import { createSlice } from "@reduxjs/toolkit";
import { toastType } from "../../../model/enum";

interface toastState {
  isShow: boolean;
  message: string;
  type: toastType;
}

const initialState: toastState = {
  isShow: false,
  message: '',
  type: toastType.info,
};

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToastMessage: (state, action) => {
          state.isShow = true;
          state.message = action.payload.message;
          state.type = action.payload.type;
        },
        closeToastMessage: (state) => {
            state.isShow = false
        }
    },
});

export const { showToastMessage, closeToastMessage  } = toastSlice.actions;

export default toastSlice.reducer;