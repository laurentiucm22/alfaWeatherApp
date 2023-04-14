import { GEO_BASE_URL, geoApiOptions } from "../../apis";
import { searchCityResults } from "../slices/searchCitySlice";

const searchCityActions = (inputValue) => {
  return async (dispatch) => {
    const GEO_API_URL = `${GEO_BASE_URL}/cities?limit=10&minPopulation=20000&namePrefix=${inputValue}`;

    const fetchGeoLocationData = async () => {
      const data = await fetch(GEO_API_URL, geoApiOptions);

      if (!data || !data.ok) {
        throw new Error(`${data.status}: Failed to GET city data!`);
      }

      const response = await data.json();

      return response;
    };

    try {
      const geolocationData = await fetchGeoLocationData();
      dispatch(searchCityResults(geolocationData));
    } catch (err) {
      throw err;
    }
  };
};

export default searchCityActions;
