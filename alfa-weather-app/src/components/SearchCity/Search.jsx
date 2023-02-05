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

  const handleWeatherData = (city) => {
    if (city.length > 0) {
      setSearchValue("");
      setGeoLocationData([]);
      navigate("current-weather");
      fetchCurrentWeatherData(city);
    }
    return;
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center custome-form md:w-96">
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />

      {geoLocationData.length > 0 ? (
        <SearchResults
          handleWeatherData={handleWeatherData}
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
