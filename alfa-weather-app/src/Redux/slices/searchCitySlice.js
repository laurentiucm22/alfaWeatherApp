import { createSlice } from "@reduxjs/toolkit";

export const initialState = { data: [] };

const searchCitySlice = createSlice({
  name: "search-results",
  initialState,
  reducers: {
    searchCityResults(state, action) {
      if (!action?.payload) {
        state.data = [];
      }
      const searchCity = action.payload.data.map((city) => ({
        id: city.id,
        city: city.city,
        country: city.country,
        countryCode: city.countryCode,
        latitude: city.latitude,
        longitude: city.longitude,
      }));

      state.data = searchCity;
    },
  },
});

export const { searchCityResults } = searchCitySlice.actions;

export default searchCitySlice.reducer;
