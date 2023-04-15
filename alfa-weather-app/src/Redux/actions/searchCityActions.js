import { GEO_BASE_URL, geoApiOptions } from "../../apis";
import { searchCityResults } from "../slices/searchCitySlice";
import { isLoading } from "../slices/uiProjectSlice";

const searchCityActions = (inputValue = "", callBacks = {}) => {
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
      dispatch(isLoading(true));
      const geoLocationData = await fetchGeoLocationData();
      dispatch(searchCityResults(geoLocationData));

      callBacks.onSuccess && callBacks.onSuccess(geoLocationData);
    } catch (err) {
      callBacks.onError && callBacks.onError(err);
      throw err;
    }
  };
};

export default searchCityActions;
