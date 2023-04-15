import React, { useCallback, useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import SearchForm from "./SearchForm";
import Loading, { LoadingPages } from "../../UI/Loading";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { resetSearchData } from "../../Redux/slices/searchCitySlice";
import searchCityActions from "../../Redux/actions/searchCityActions";
import { isLoading, isLoadingPage } from "../../Redux/slices/uiProjectSlice";
import currentWeatherActions from "../../Redux/actions/currentWeatherActions";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchCityList = useSelector((state) => state.rootSearchResult.data);
  const loading = useSelector((state) => state.rootUi.loading);

  const debounceValueHandler = useDebounce(searchValue, 1000);

  const searchCityHandler = useCallback(() => {
    if (debounceValueHandler !== "") {
      dispatch(
        searchCityActions(debounceValueHandler, {
          onSuccess() {
            dispatch(isLoading(false));
          },
          onError() {
            dispatch(isLoading(false));
          },
        })
      );
    }

    dispatch(resetSearchData());
    return;
  }, [debounceValueHandler, dispatch]);

  useEffect(() => {
    searchCityHandler();
  }, [searchCityHandler]);

  const onSelectedCity = async (selectedCity) => {
    setSearchValue("");
    dispatch(resetSearchData());
    dispatch(isLoadingPage(true));
    const { lat, lon, city, id } = selectedCity;

    try {
      await dispatch(
        currentWeatherActions({
          ...(lat && { lat }),
          ...(lon && { lon }),
          ...(city && { city }),
          ...(id && { id }),
        })
      );
      dispatch(isLoadingPage(false));
    } catch (err) {
      throw err;
    } finally {
      navigate("current-weather");
    }
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center custome-form md:w-96">
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />

      {searchCityList?.length > 0 && (
        <SearchResults onSelectedCity={onSelectedCity} />
      )}

      {loading && <Loading />}
    </Wrapper>
  );
};

export default Search;
