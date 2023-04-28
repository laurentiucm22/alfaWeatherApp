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
import { isLoading, isLoadingPage, isError } from "../../Redux/slices/uiSlice";
import currentWeatherActions from "../../Redux/actions/currentWeatherActions";

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
      const status = {
        onSuccess() {
          dispatch(isLoading(false));
          dispatch(isError(false));
        },

        onError() {
          dispatch(isLoading(false));
          dispatch(isError(true));
        },
      };

      dispatch(searchCityActions(debounceValue, status));
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

      await dispatch(
        currentWeatherActions({
          ...(id && { id }),
          ...(lat && { lat }),
          ...(lon && { lon }),
          ...(city && { city }),
        })
      );
    },
    [dispatch]
  );

  const onSelectedCity = async (selectedCity) => {
    setSearchValue("");
    dispatch(resetSearchData());
    dispatch(isLoadingPage(true));

    try {
      await currentWeatherData(selectedCity);

      dispatch(isLoadingPage(false));
    } catch (err) {
      dispatch(isError(true));
      throw err;
    } finally {
      navigate("current-weather");
    }
  };

  return (
    <Container className="flex flex-col items-center justify-center custome-form md:w-96">
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
