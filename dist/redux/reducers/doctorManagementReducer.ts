import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "src/api";

export enum ApiLoadingStatus{
  None,
  Loading,
  Success,
  Failed
}

interface DoctorMangementState {
  doctorList: any[];
  loadDoctorStatus: ApiLoadingStatus;
  isDataLoaded: boolean;
}

const initialState: DoctorMangementState = {
  doctorList: [],
  loadDoctorStatus: ApiLoadingStatus.None,
  isDataLoaded: undefined
}

export const doctorMangementSlice = createSlice({
  name: 'doctorMangement',
  initialState,
  reducers: {
    setDoctorList: (state, action) => {
      state.doctorList = action.payload
    }
  },
});

export const { setDoctorList } = doctorMangementSlice.actions;

export default doctorMangementSlice.reducer;