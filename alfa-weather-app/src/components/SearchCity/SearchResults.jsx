import React from "react";
import Button from "../../UI/Button";
import loaderIcon from "../../assets/images/icons-loading.png";

const SearchResults = ({ geoLocationData, error, handleWeatherData }) => {
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
                className="p-1 font-bold text-left hover:bg-blue-200 hover:text-black text-md md:text-lg"
                onClick={() => handleWeatherData(geoLocationData)}
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
