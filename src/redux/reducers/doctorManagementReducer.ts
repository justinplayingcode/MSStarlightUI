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
  loadDoctorStatus: ApiLoadingStatus;
  isDataLoaded: boolean;
}

const initialState: DoctorMangementState = {
  doctorList: [],
  loadDoctorStatus: ApiLoadingStatus.None,
  isDataLoaded: undefined
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
        state.loadDoctorStatus = ApiLoadingStatus.Loading;,
        state.isDataLoaded = false
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loadDoctorStatus = ApiLoadingStatus.Success,
        state.doctorList = action.payload,
        state.isDataLoaded = true
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loadDoctorStatus = ApiLoadingStatus.Failed,
        state.isDataLoaded = true
      })
  }
});

export const { setDoctorList, resetLoadDoctorStatus } = doctorMangementSlice.actions;

export default doctorMangementSlice.reducer;