import { createSlice } from "@reduxjs/toolkit";

interface PanelState {
  isOpen: boolean;
  panelType: string;
  isLoading: boolean;
}

const initialState: PanelState = {
  isOpen: false,
  panelType: '',
  isLoading: false
}

export const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    openPanel: (state, action) => {
      state.isOpen = true,
      state.panelType = action.payload
    },
    closePanel: (state) => {
      state.isOpen = false,
      state.panelType = '',
      state.isLoading = false
    },
    openPanelLoading: (state) => {
      state.isLoading = true
    },
    closePanelLoading: (state) => {
      state.isLoading = false
    }
  }
});

export const { openPanel, closePanel, openPanelLoading, closePanelLoading } = panelSlice.actions;

export default panelSlice.reducer;