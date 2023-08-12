import { createSlice } from "@reduxjs/toolkit";

interface TableBehaviourState {
    refresh: boolean
}

const initialState: TableBehaviourState = {
  refresh: false
};

export const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        tableRefresh: (state) => {
          const newState = !state.refresh;
          state.refresh = newState;
        },
    },
});

export const { tableRefresh } = tableSlice.actions;

export default tableSlice.reducer;
