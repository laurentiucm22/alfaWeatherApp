import { createSlice } from "@reduxjs/toolkit";

export const initialState = { data: [] };

const searchCitySlice = createSlice({
  name: "search-results",
  initialState,
  reducers: {
    resetSearchData(state) {
      state.data = [];
    },

    searchCityResults(state, action) {
      if (!action?.payload) {
        state.data = [];
      }

      const searchCityTransResp = action.payload.data.map((city) => ({
        id: city.id,
        city: city.city,
        country: city.country,
        countryCode: city.countryCode,
        lat: city.latitude,
        lon: city.longitude,
      }));

      state.data = searchCityTransResp;
    },
  },
});

export const { searchCityResults, resetSearchData } = searchCitySlice.actions;

export default searchCitySlice.reducer;
