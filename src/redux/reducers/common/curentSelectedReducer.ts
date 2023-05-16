import { createSlice } from "@reduxjs/toolkit";

interface currentSelectedState {
    currentId: string;
    tableSelectedCount: Number;
    tableSelectedItem : any[];
    
    currentSidebar: string;
}

const initialState: currentSelectedState = {
    currentId: '',
    tableSelectedCount: 0,
    tableSelectedItem: [],

    currentSidebar:''
}

export const curentSelectedSlice = createSlice({
  name: 'curentSelected',
  initialState,
  reducers: {
    setCurentId: (state, action) => {
        state.currentId = action.payload
    },

    setCurrentSidebar: (state, action) => {
      console.log(action.payload);      
      state.currentSidebar = action.payload;
    },

    setTableSelectedCount: (state, action) => {
      state.tableSelectedCount = action.payload;
    },

    setTableSelectedItem: (state, action) => {
      state.tableSelectedItem = action.payload;
    },
  }
});

export const {setCurentId, setCurrentSidebar, setTableSelectedCount, setTableSelectedItem } = curentSelectedSlice.actions;

export default curentSelectedSlice.reducer;