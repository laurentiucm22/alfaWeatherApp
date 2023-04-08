import React, { useEffect, useState } from "react";
import { fetchGeoLocationData, fetchCurrentWeatherData } from "../../apis";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import SearchForm from "./SearchForm";
import Loading from "../../UI/Loading";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [geoLocationData, setGeoLocationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const debounceValueHandler = useDebounce(searchValue, 600);

  const handleFetchLocationData = async () => {
    if (debounceValueHandler) {
      setIsLoading(true);
      try {
        await fetchGeoLocationData(debounceValueHandler).then((city) => {
          setGeoLocationData(city);
        });
      } catch (err) {
        console.warn(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    } else {
      setGeoLocationData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchLocationData(debounceValueHandler);
  }, [debounceValueHandler]);

  const onSelectedCity = async (selectedCity) => {
    setGeoLocationData([]);
    setSearchValue("");

    try {
      const { lat, lon, city } = selectedCity;

      await fetchCurrentWeatherData({
        ...(lat && { lat }),
        ...(lon && { lon }),
        ...(city && { city }),
      });
    } catch (err) {
      console.warn(err);
      throw err;
    } finally {
      navigate("current-weather");
    }
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center custome-form md:w-96">
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />

      {geoLocationData?.length > 0 && (
        <SearchResults
          onSelectedCity={onSelectedCity}
          geoLocationData={geoLocationData}
        />
      )}

      {isLoading && <Loading />}
    </Wrapper>
  );
};

export default Search;
