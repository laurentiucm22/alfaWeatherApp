import React, { useEffect, useState } from "react";
import { fetchGeoLocationData, fetchCurrentWeatherData } from "../../apis";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import SearchForm from "./SearchForm";
import Loading from "../../UI/Loading";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import {
  initialState,
  searchCityResults,
} from "../../Redux/slices/searchCitySlice";
import searchCityActions from "../../Redux/actions/searchCityActions";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchCityList = useSelector((state) => state.rootSearchResult.data);
  const debounceValueHandler = useDebounce(searchValue, 600);

  useEffect(() => {
    if (debounceValueHandler === "") return;

    dispatch(searchCityActions(debounceValueHandler));
  }, [dispatch, debounceValueHandler]);

  const onSelectedCity = async (selectedCity) => {
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
    }
    // finally {
    //   navigate("current-weather");
    // }
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center custome-form md:w-96">
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />

      {searchCityList?.length > 0 && (
        <SearchResults onSelectedCity={onSelectedCity} />
      )}

      {/*{<Loading />}*/}
    </Wrapper>
  );
};

export default Search;
