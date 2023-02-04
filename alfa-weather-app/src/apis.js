// GEO Location API
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACR_APP_GEOLOCATION_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_GEOLOCATION_API_HOST,
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// CURRENT WEATHER API
export const CURRENT_WEATHER_URL =
  "https://api.openweathermap.org/data/2.5/weather";

export const CURRENT_WEATHER_API_KEY =
  process.env.REACT_APP_CURRENT_WEATHER_API_KEY;
