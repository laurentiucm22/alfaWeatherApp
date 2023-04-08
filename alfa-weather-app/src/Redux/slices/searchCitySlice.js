import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const searchCitySlice = createSlice({
  name: "searchCityData",
  initialState,
  reducers: {
    searchCityRequest: (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    },
    searchCitySuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    searchCityError: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const { searchCityRequest, searchCitySuccess, searchCityError } =
  searchCitySlice.actions;
