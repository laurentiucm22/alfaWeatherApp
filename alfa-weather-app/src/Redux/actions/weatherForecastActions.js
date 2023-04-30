import { WEATHER_FORE_CAST_BASE_URL, weatherForeCastOptions } from "../../apis";
import { errorCard, isError } from "../slices/uiSlice";
import { forecastData } from "../slices/weatherForecastSlice";

const weatherForecastActions = (coords = {}) => {
  return async (dispatch) => {
    if (coords.lat && coords.lon) {
      const fetchForecastData = async () => {
        const weatherForeCastUrl = `${WEATHER_FORE_CAST_BASE_URL}?lat=${coords.lat}&lon=${coords.lon}&units=metric`;
        // https://rapidapi.com/weatherbit/api/weather/

        const data = await fetch(weatherForeCastUrl, weatherForeCastOptions);

        if (!data.ok) {
          dispatch(
            errorCard({
              title: `Error ${data.status}`,
              message: "Failed to fetch Forecast Data!",
            })
          );

          throw new Error(`${data.status}: Missing current weather data!`);
        }

        const response = await data.json();
        console.log(response);
      };

      try {
        const forecast = await fetchForecastData();
        dispatch(forecastData(forecast));
      } catch (err) {
        console.warn(err);
        throw err;
      }
    }
  };
};

export default weatherForecastActions;
