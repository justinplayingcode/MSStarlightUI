import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "src/api/auth";

export enum ApiLoadingStatus{
  None,
  Loading,
  Success,
  Failed
}

interface DoctorMangementState {
  doctorList: any[];
  loadDoctorStatus: ApiLoadingStatus
}

const initialState: DoctorMangementState = {
  doctorList: [],
  loadDoctorStatus: ApiLoadingStatus.None
}

export const getAllDoctors = createAsyncThunk(
  'doctorMangement/getall',
  async () => {
    const { data } = await authApi.getAllDoctor();
    return data;
  }
)

export const doctorMangementSlice = createSlice({
  name: 'doctorMangement',
  initialState,
  reducers: {
    setDoctorList: (state, action) => {
      state.doctorList = action.payload
    },
    resetLoadDoctorStatus: (state) => {
      state.loadDoctorStatus = ApiLoadingStatus.None;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDoctors.pending, (state, action) => {
        state.loadDoctorStatus = ApiLoadingStatus.Loading;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loadDoctorStatus = ApiLoadingStatus.Success,
        state.doctorList = action.payload
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loadDoctorStatus = ApiLoadingStatus.Failed
      })
  }
});

export const { setDoctorList, resetLoadDoctorStatus } = doctorMangementSlice.actions;

export default doctorMangementSlice.reducer;