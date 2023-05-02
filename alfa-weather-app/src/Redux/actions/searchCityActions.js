import { GEO_BASE_URL, geoApiOptions } from "../../apis";
import { searchCityResults } from "../slices/searchCitySlice";
import { errorCard, isError, isLoading } from "../slices/uiSlice";

const searchCityActions = (inputValue = "") => {
  return async (dispatch) => {
    const GEO_API_URL = `${GEO_BASE_URL}/cities?limit=10&minPopulation=20000&namePrefix=${inputValue}`;

    const fetchGeoLocationData = async () => {
      const data = await fetch(GEO_API_URL, geoApiOptions);

      if (!data || !data.ok) {
        dispatch(
          errorCard({
            title: `Error: ${data.status}`,
            message: "Failed to fetch City Data!",
          })
        );

        throw new Error(`${data.status}: Failed to fetch City Data!`);
      }

      const response = await data.json();

      return response;
    };

    try {
      dispatch(isLoading(true));

      const geoLocationData = await fetchGeoLocationData();
      dispatch(searchCityResults(geoLocationData));

      if (geoLocationData) {
        dispatch(isLoading(false));
      }
    } catch (err) {
      dispatch(isLoading(false));
      dispatch(isError(true));
      throw err;
    }
  };
};

export default searchCityActions;
