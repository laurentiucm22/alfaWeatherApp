import React from "react";
import Button from "../../UI/Button";
import { useSelector } from "react-redux";

const SearchResults = ({ onSelectedCity }) => {
  const searchCityResultsList = useSelector(
    (state) => state.rootSearchResult.data
  );

  return (
    <ul className="w-full">
      <li className="flex flex-col list-none bg-blue-500 rounded-b-md border-stone-500">
        {searchCityResultsList.map(
          ({ id, city, country, countryCode }, index) => {
            return (
              <Button
                key={id}
                className="px-2 py-1 font-medium text-left hover:bg-blue-300 hover:text-black text-md md:text-lg"
                onClick={() => onSelectedCity(searchCityResultsList[index])}
              >
                {`${city}, ${country} ${countryCode}`}
              </Button>
            );
          }
        )}
      </li>
    </ul>
  );
};

export default SearchResults;
