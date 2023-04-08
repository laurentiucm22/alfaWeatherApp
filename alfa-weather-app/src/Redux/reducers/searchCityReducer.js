const searchCityReducer = (state = {}, action) => {
  switch (action?.type) {
    case "SEARCH_CITY_DATA_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "SEARCH_CITY_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case "SEARCH_CITY_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchCityReducer;
