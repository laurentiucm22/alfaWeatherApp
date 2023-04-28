import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isLoadingPage: false,
  isError: false,
  errorCard: null,
  isAuthenticate: localStorage.getItem("isAuth"),
};

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
    isError(state, action) {
      state.isError = action.payload;
    },
    errorCard(state, action) {
      state.errorCard = {
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    isAuthenticated(state, action) {
      state.isAuthenticate = action.payload;
    },
  },
});

export const { isLoading, isLoadingPage, isError, errorCard, isAuthenticated } =
  uiSlice.actions;

export default uiSlice.reducer;
