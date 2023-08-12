import { createSlice } from "@reduxjs/toolkit";

export enum ApiLoadingStatus{
  None,
  Loading,
  Success,
  Failed
}

interface DoctorMangementState {
  doctorList: any[];
  loadDoctorStatus: ApiLoadingStatus;
}

const initialState: DoctorMangementState = {
  doctorList: [],
  loadDoctorStatus: ApiLoadingStatus.None,
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