import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "src/api/auth";

interface DoctorMangementState {
  doctorList: any[];
  isLoading: boolean;
  isDataLoaded: boolean;
}

const initialState: DoctorMangementState = {
  doctorList: [],
  isLoading: undefined,
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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDoctors.pending, (state, action) => {
        state.isLoading = true,
        state.isDataLoaded = false
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.isLoading = false,
        state.doctorList = action.payload,
        state.isDataLoaded = true
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.isLoading = false,
        state.isDataLoaded = true
      })
  }
});

export const { setDoctorList } = doctorMangementSlice.actions;

export default doctorMangementSlice.reducer;