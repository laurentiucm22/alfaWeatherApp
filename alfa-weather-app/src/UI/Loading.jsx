import React from "react";
import loaderIcon from "../assets/images/icons-loading.png";

const Loading = () => {
  return (
    <p className="flex items-center self-start font-bold">
      <span className="mr-1 animate-spin">
        <img src={loaderIcon} alt="loader" />
      </span>
      Loading...
    </p>
  );
};

export default Loading;
