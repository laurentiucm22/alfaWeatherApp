import { combineReducers } from "redux";
import searchCityReducer from "../slices/searchCitySlice";

const rootReducer = combineReducers({
  rootSearchResult: searchCityReducer,
});

export default rootReducer;
