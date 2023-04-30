import { createSlice } from "@reduxjs/toolkit";

const weatherForecastSlice = createSlice({
  name: "forecast",
  initialState: { data: [] },
  reducers: {
    forecastData(state, action) {
      state.data.push(action.payload);
    },
  },
});

export const { forecastData } = weatherForecastSlice.actions;

export default weatherForecastSlice.reducer;
