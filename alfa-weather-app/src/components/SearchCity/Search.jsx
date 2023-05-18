import React, { useCallback, useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import Loading from "../../UI/Loading";
import ErrorCard from "../../UI/ErrorCard";
import Container from "../../UI/Container";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { resetSearchData } from "../../Redux/slices/searchCitySlice";
import searchCityActions from "../../Redux/actions/searchCityActions";
import { isLoadingPage, isError } from "../../Redux/slices/uiSlice";
import currentWeatherActions from "../../Redux/actions/currentWeatherActions";
import weatherForecastActions from "../../Redux/actions/weatherForecastActions";

const Search = () => {
  // Hooks
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchCityList = useSelector((state) => state.rootSearchResult.data);
  const loading = useSelector((state) => state.rootUi.loading);
  const errorBool = useSelector((state) => state.rootUi.isError);
  const errorCardDescription = useSelector((state) => state.rootUi.errorCard);
  const isAuth = useSelector((state) => state.rootUi.isAuthenticate);
  const debounceValue = useDebounce(searchValue, 1000);

  // Components logic
  const searchCityHandler = useCallback(() => {
    if (debounceValue !== "") {
      dispatch(searchCityActions(debounceValue));
    }
    dispatch(isError(false));
    dispatch(resetSearchData());
    return;
  }, [debounceValue, dispatch]);

  useEffect(() => {
    searchCityHandler();
  }, [searchCityHandler]);

  const currentWeatherData = useCallback(
    async (currentWeatherForSelectedCity) => {
      const { lat, lon, city, id } = currentWeatherForSelectedCity;

      const transformedSelectedCityObj = {
        ...(id && { id }),
        ...(lat && { lat }),
        ...(lon && { lon }),
        ...(city && { city }),
      };

      await dispatch(currentWeatherActions(transformedSelectedCityObj));

      // await dispatch(weatherForecastActions(transformedSelectedCityObj));
    },
    [dispatch]
  );

  const onSelectedCity = async (selectedCity) => {
    setSearchValue("");
    dispatch(resetSearchData());
    dispatch(isLoadingPage(true));
    localStorage.setItem("lastCity", JSON.stringify(selectedCity));

    try {
      await currentWeatherData(selectedCity);

      dispatch(isLoadingPage(false));
    } catch (err) {
      dispatch(isError(true));

      throw err;
    } finally {
      navigate("city-weather");
    }
  };

  useEffect(() => {
    const storedLastCity = localStorage.getItem("lastCity");

    const handleLocalStoredData = async () => {
      dispatch(isLoadingPage(true));

      try {
        const prevCity = JSON.parse(storedLastCity);
        navigate("/city-weather");

        await dispatch(currentWeatherActions(prevCity));
        // await dispatch(weatherForecastActions(prevCity));

        dispatch(isLoadingPage(false));
      } catch (err) {
        dispatch(isError(true));
      }
    };

    if (storedLastCity !== null) {
      handleLocalStoredData();
    }
    return;
  }, [dispatch, navigate]);

  return (
    <Container className="flex flex-col items-center justify-center w-72 custome-form md:w-96">
      {isAuth && (
        <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />
      )}

      <ul className="w-full">
        {searchCityList.length > 0 && (
          <SearchResults onSelectedCity={onSelectedCity} />
        )}
      </ul>

      {loading && <Loading />}
      {errorBool && (
        <ErrorCard
          title={errorCardDescription.title}
          message={errorCardDescription.message}
        />
      )}
    </Container>
  );
};

export default Search;
