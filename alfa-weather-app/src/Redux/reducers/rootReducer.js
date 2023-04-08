import { combineReducers } from "redux";
import searchCityReducer from "./searchCityReducer";

const rootReducer = combineReducers({
  searchCityData: searchCityReducer,
});

export default rootReducer;
