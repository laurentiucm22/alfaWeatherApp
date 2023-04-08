import React from "react";
import Form from "../../UI/Form";
import Input from "../../UI/Input";

const SearchForm = ({ searchValue, setSearchValue }) => {
  return (
    <Form className="w-full bg-blue-500 rounded-md">
      <div className="flex flex-col font-medium ">
        <label htmlFor="search-city" className="px-2 py-1 text-md md:text-lg">
          Search City:
        </label>
        <Input
          id="search-city"
          className="px-2 py-1 text-black outline-none rounded-b-md"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </Form>
  );
};

export default SearchForm;
