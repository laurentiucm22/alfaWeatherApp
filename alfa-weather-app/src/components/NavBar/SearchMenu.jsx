import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchMenu = () => {
  return (
    <div className="p-2 mx-4 border border-indigo-700 rounded-full shadow-lg text-md">
      <BiSearch className="cursor-pointer text-slate-200" />
    </div>
  );
};

export default SearchMenu;
