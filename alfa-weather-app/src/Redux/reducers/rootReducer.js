import { combineReducers } from "redux";
import searchCityReducer from "../slices/searchCitySlice";
import currentWeatherReducer from "../slices/currentWeatherSlice";
import forecastReducer from "../slices/weatherForecastSlice";
import uiReducer from "../slices/uiSlice";

const rootReducer = combineReducers({
  rootSearchResult: searchCityReducer,
  rootCurrentWeather: currentWeatherReducer,
  rootForecast: forecastReducer,
  rootUi: uiReducer,
});

export default rootReducer;
