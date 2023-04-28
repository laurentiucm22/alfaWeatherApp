import React from "react";
import ReactDOM from "react-dom";
import loaderIcon from "../assets/images/icons-loading.png";
import Container from "./Container";
import { BiLoaderAlt as PageLoader } from "react-icons/bi";

export const LoadingPages = ({ isLoadingPage }) => {
  if (!isLoadingPage) {
    return null;
  }

  return ReactDOM.createPortal(
    <Container className="absolute top-0 left-0 z-50 w-screen h-screen bg-black/[0.4] flex items-center justify-center">
      <Container className="w-8 h-8 animate-spin">
        <PageLoader className="w-full h-full text-white" />
      </Container>
    </Container>,
    document.getElementById("overlay")
  );
};

const Loading = () => {
  return (
    <Container className="flex items-center self-start font-bold">
      <span className="mr-1 animate-spin">
        <img src={loaderIcon} alt="loader" />
      </span>
      <p>Loading...</p>
    </Container>
  );
};

export default Loading;
