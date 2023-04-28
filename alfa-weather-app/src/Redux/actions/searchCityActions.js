import { GEO_BASE_URL, geoApiOptions } from "../../apis";
import { searchCityResults } from "../slices/searchCitySlice";
import { errorCard, isLoading } from "../slices/uiSlice";

const searchCityActions = (inputValue = "", status = {}) => {
  return async (dispatch) => {
    const GEO_API_URL = `${GEO_BASE_URL}/cities?limit=10&minPopulation=20000&namePrefix=${inputValue}`;

    const fetchGeoLocationData = async () => {
      const data = await fetch(GEO_API_URL, geoApiOptions);

      if (!data || !data.ok) {
        dispatch(
          errorCard({
            title: `Error: ${data.status}`,
            message: "Failed to GET city data!",
          })
        );

        throw new Error(`${data.status}: Failed to GET city data!`);
      }

      const response = await data.json();

      return response;
    };

    try {
      dispatch(isLoading(true));

      const geoLocationData = await fetchGeoLocationData();
      dispatch(searchCityResults(geoLocationData));

      status.onSuccess && status.onSuccess(geoLocationData);
    } catch (err) {
      status.onError && status.onError(err);

      dispatch(isLoading(false));

      throw err;
    }
  };
};

export default searchCityActions;
