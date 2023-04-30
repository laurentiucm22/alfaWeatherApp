// GEO Location API
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_GEOLOCATION_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_GEOLOCATION_API_HOST,
  },
};
export const GEO_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// Current Weather API
export const currentWeatherApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_CURRENT_WEATHER_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_CURRENT_WEATHER_API_HOST,
  },
};
export const CURRENT_WEATHER_BASE_URL =
  "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather";

// Weather forecast API
export const weatherForeCastOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_WEATHER_FORECAST_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_WEATHER_FORECAST_API_HOST,
  },
};

export const WEATHER_FORE_CAST_BASE_URL =
  "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely";
