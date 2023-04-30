import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchMenu = () => {
  return (
    <div className="p-2 ml-1">
      <BiSearch
        size={36}
        className="p-2 transition bg-indigo-500 rounded-full cursor-pointer text-bold text-slate-200 hover:text-black hover:bg-indigo-400"
      />
    </div>
  );
};

export default SearchMenu;
