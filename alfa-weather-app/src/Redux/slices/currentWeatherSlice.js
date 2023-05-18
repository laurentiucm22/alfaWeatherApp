import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const currentWeatherSlice = createSlice({
  name: "current-weather",
  initialState,
  reducers: {
    currentWeatherData(state, action) {
      state.data.push(action.payload);
    },
  },
});

export const { currentWeatherData } = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
