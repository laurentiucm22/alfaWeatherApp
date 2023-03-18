import React, { useEffect, useState } from "react";
import { fetchGeoLocationData, fetchCurrentWeatherData } from "../../apis";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import loaderIcon from "../../assets/images/icons-loading.png";
import Wrapper from "../../UI/Wrapper";
import SearchForm from "./SearchForm";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [geoLocationData, setGeoLocationData] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleFetchLocationData = async (searchValue) => {
    try {
      setError(false);

      await fetchGeoLocationData(searchValue).then((city) => {
        setGeoLocationData(city);
      });
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    handleFetchLocationData(searchValue);
  }, [searchValue]);

  const onSelectedCity = async (selectedCity) => {
    setSearchValue("");
    setGeoLocationData([]);

    try {
      const { lat, lon, city } = selectedCity;
      console.log(lat, lon, city);
      await fetchCurrentWeatherData({
        ...(lat && { lat }),
        ...(lon && { lon }),
        ...(city && { city }),
      });
    } catch (err) {
      setError(true);
    } finally {
      navigate("current-weather");
    }
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center custome-form md:w-96">
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />

      {geoLocationData?.length > 0 ? (
        <SearchResults
          onSelectedCity={onSelectedCity}
          geoLocationData={geoLocationData}
          error={error}
        />
      ) : (
        error && (
          <p className="flex items-center self-start font-bold">
            <span className="mr-1 animate-spin">
              <img src={loaderIcon} alt="loader" />
            </span>
            Loading...
          </p>
        )
      )}
    </Wrapper>
  );
};

export default Search;
