import { createSlice } from "@reduxjs/toolkit";

interface currentSelectedState {
    currentId: string;
    selectedCount: number;
    selectedItem : any
}

const initialState: currentSelectedState = {
    currentId: '',
    selectedCount: 0,
    selectedItem: undefined
}

export const curentSelectedSlice = createSlice({
  name: 'curentSelected',
  initialState,
  reducers: {
    setCurentId: (state, action) => {
        state.currentId = action.payload
    }
  }
});

export const { } = curentSelectedSlice.actions;

export default curentSelectedSlice.reducer;