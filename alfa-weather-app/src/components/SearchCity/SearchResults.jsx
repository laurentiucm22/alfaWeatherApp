import React from "react";
import Button from "../../UI/Button";

const SearchResults = ({ geoLocationData, onSelectedCity }) => {
  return (
    <ul className="w-full">
      <li className="flex flex-col list-none bg-blue-500 rounded-b-md border-stone-500">
        {geoLocationData.map(({ id, city, country, countryCode }, index) => {
          return (
            <Button
              key={id}
              className="px-2 py-1 font-medium text-left hover:bg-blue-300 hover:text-black text-md md:text-lg"
              onClick={() => onSelectedCity(geoLocationData[index])}
            >
              {`${city}, ${country} ${countryCode}`}
            </Button>
          );
        })}
      </li>
    </ul>
  );
};

export default SearchResults;
