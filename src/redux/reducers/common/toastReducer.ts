// import { createSlice } from "@reduxjs/toolkit";
// import { IToastProps } from "src/app/common/Toast/ToastItem";

// interface toastState {
//   toasts: IToastProps[]
// }

// const initialState: toastState = {
//   toasts: []
// };

// export const toastSlice = createSlice({
//     name: "toast",
//     initialState,
//     reducers: {
//         showMessagerBar: (state, action ) => {
//           let oldToast = [...state.toasts]
//           state.toasts = [ oldToast]
//         },
//         closeMessagerBar: (state) => {
//             state.isShow = false,
//             state.selectedMenu = ""
//         }
//     },
// });

// export const { showMessagerBar, closeMessagerBar  } = toastSlice.actions;

// export default toastSlice.reducer;