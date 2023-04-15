import { createSlice } from "@reduxjs/toolkit";

const currentWeatherSlice = createSlice({
  name: "current-weather",
  initialState: { data: [] },
  reducers: {
    currentWeatherData(state, action) {
      state.data.push(action.payload);
    },
  },
});

export const { currentWeatherData } = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
