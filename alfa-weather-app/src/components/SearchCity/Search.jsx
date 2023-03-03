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
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue === "") {
      setError(false);
      setGeoLocationData([]);
      return;
    } else {
      setError(true);
      const debounceTime = setTimeout(() => {
        fetchGeoLocationData(searchValue).then((city) => {
          setGeoLocationData(city);
          setError(false);
        });
      }, 600);
      return () => {
        clearTimeout(debounceTime);
        setError(true);
      };
    }
  }, [searchValue]);

  const onSelectedCity = (selectedCity) => {
    setSearchValue("");
    setGeoLocationData([]);

    if (selectedCity.length > 0) {
      navigate("current-weather");

      // prettier-ignore
      const getCoordinates = selectedCity
        .map(({ id = 0, lat = 1.1, lon = 1.1, city = "Your city" }) => ({id, lat, lon, city,})).find(({ id }) => id);

      fetchCurrentWeatherData(getCoordinates);
    }
    return;
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center custome-form md:w-96">
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />

      {geoLocationData.length > 0 ? (
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
