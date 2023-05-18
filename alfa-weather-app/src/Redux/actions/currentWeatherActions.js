import { CURRENT_WEATHER_BASE_URL, currentWeatherApiOptions } from "../../apis";
import { currentWeatherData } from "../slices/currentWeatherSlice";
import { errorCard } from "../slices/uiSlice";

const currentWeatherActions = (coords = {}) => {
  return async (dispatch) => {
    if (coords.lat && coords.lon) {
      const cityName = coords.city;
      const cityId = coords.id;

      const CURRENT_WEATHER_URL = `${CURRENT_WEATHER_BASE_URL}?lat=${coords.lat}&lon=${coords.lon}`;

      const fetchCurrentWeatherData = async () => {
        const data = await fetch(CURRENT_WEATHER_URL, currentWeatherApiOptions);

        if (!data.ok) {
          dispatch(
            errorCard({
              title: `Error ${data.status}`,
              message: "Failed to fetch Current Weather Data!",
            })
          );

          throw new Error(
            `${data.status}: Faild to fetch Current Weather data!`
          );
        }
        const response = await data.json();

        const transformedDataObj = {
          ...response,
          cityName,
          cityId,
        };

        return transformedDataObj;
      };

      try {
        const currentWeather = await fetchCurrentWeatherData();
        dispatch(currentWeatherData(currentWeather));
      } catch (err) {
        console.warn(err);
        throw err;
      }
    }
  };
};

export default currentWeatherActions;
