import { combineReducers } from "redux";
import searchCityReducer from "../slices/searchCitySlice";
import currentWeatherReducer from "../slices/currentWeatherSlice";
import uiReducer from "../slices/uiProjectSlice";

const rootReducer = combineReducers({
  rootSearchResult: searchCityReducer,
  rootCurrentWeather: currentWeatherReducer,
  rootUi: uiReducer,
});

export default rootReducer;
