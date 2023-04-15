import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, isLoadingPage: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    isLoading(state, action) {
      state.loading = action.payload;
    },
    isLoadingPage(state, action) {
      state.isLoadingPage = action.payload;
    },
  },
});

export const { isLoading, isLoadingPage } = uiSlice.actions;

export default uiSlice.reducer;
