import {
  SEARCH_CITY_DATA_REQUEST,
  SEARCH_CITY_DATA_SUCCESS,
  SEARCH_CITY_DATA_FAILURE,
} from "../../utils/constants";

const GEO_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_GEOLOCATION_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_GEOLOCATION_API_HOST,
  },
};

export const searchCityAction = (inputValue = "") => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_CITY_DATA_REQUEST });

    const GEO_API_URL = `${GEO_BASE_URL}/cities?limit=10&minPopulation=20000&namePrefix=${inputValue}`;

    try {
      const data = await fetch(GEO_API_URL, geoApiOptions);

      if (!data || !data.ok) throw new Error(`${data.status}: Invalid data!`);

      const response = await data.json();
      // console.log(response);

      dispatch({
        type: SEARCH_CITY_DATA_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: SEARCH_CITY_DATA_FAILURE,
        payload: err.message,
      });
      throw err;
    }
  };
};
