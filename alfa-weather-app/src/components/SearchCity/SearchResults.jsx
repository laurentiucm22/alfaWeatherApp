import React from "react";
import Button from "../../UI/Button";
import loaderIcon from "../../assets/images/icons-loading.png";

const SearchResults = ({ geoLocationData, error, onSelectedCity }) => {
  return (
    <ul className="w-full">
      <li className="flex flex-col list-none bg-blue-500 rounded-b-md border-stone-500">
        {error ? (
          <p className="flex items-center p-1 font-bold">
            <span className="mr-1 animate-spin">
              <img src={loaderIcon} alt="loader" />
            </span>
            Loading...
          </p>
        ) : (
          geoLocationData.map(({ id, city, country, countryCode }) => {
            return (
              <Button
                key={id}
                className="px-2 py-1 font-medium text-left hover:bg-blue-300 hover:text-black text-md md:text-lg"
                onClick={() => onSelectedCity(geoLocationData)}
              >
                {`${city}, ${country} ${countryCode}`}
              </Button>
            );
          })
        )}
      </li>
    </ul>
  );
};

export default SearchResults;
