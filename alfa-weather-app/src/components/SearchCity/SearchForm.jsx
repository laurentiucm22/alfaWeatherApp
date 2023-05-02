import React from "react";
import Form from "../../UI/Form";
import Input from "../../UI/Input";

const SearchForm = ({ searchValue, setSearchValue }) => {
  const searchFormStyle = {
    formStyle: "w-full bg-blue-500 rounded-md flex flex-col font-medium",
    formLabel: "px-2 py-1 text-sm md:text-md",
    formInput: "px-2 py-1 text-black outline-none rounded-b-md",
  };

  return (
    <Form className={searchFormStyle.formStyle}>
      <label htmlFor="search-city" className={searchFormStyle.formLabel}>
        Search City:
      </label>
      <Input
        id="search-city"
        className={searchFormStyle.formInput}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </Form>
  );
};

export default SearchForm;
