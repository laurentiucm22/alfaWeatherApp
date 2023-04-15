import React from "react";
import ReactDOM from "react-dom";
import loaderIcon from "../assets/images/icons-loading.png";
import Wrapper from "./Wrapper";
import { BiLoaderAlt as PageLoader } from "react-icons/bi";

export const LoadingPages = ({ isLoadingPage }) => {
  if (!isLoadingPage) {
    return null;
  }

  return ReactDOM.createPortal(
    <Wrapper className="absolute top-0 left-0 z-50 w-screen h-screen bg-black/[0.4] flex items-center justify-center">
      <Wrapper className="w-8 h-8 animate-spin">
        <PageLoader className="w-full h-full text-white" />
      </Wrapper>
    </Wrapper>,
    document.getElementById("overlay")
  );
};

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
