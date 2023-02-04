import React, { Fragment, useEffect, useState } from "react";
import { useFetch } from "../../hook/useFetch";
import Form from "../../UI/Form";
import Input from "../../UI/Input";
import { GEO_API_URL, geoApiOptions } from "../../apis";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const geoCustomUrl = `${GEO_API_URL}/cities?minPopulation=20000&namePrefix=${searchValue}`;

  // prettier-ignore
  const {data, loading} = useFetch(geoCustomUrl,geoApiOptions);
  console.log(data, loading);

  useEffect(() => {
    setTimeout(() => {
      setSearchValue(searchValue);
    }, 600);
  }, []);

  return (
    <Fragment>
      <Form className="bg-purple-400 rounded-md w-60 sm:w-1/2 xl:w-72">
        <div className="flex flex-col font-bold">
          <label htmlFor="search-city" className="p-1">
            Search City:
          </label>
          <Input
            id="search-city"
            className="rounded-md outline-none text-black p-1"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value.trim());
            }}
          />
        </div>
      </Form>
    </Fragment>
  );
};

export default Search;
