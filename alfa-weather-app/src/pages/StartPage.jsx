import React from "react";
import Search from "../components/SearchCity/Search";
import introWeatherAppImg from "../assets/images/weather-app-intro.png";
import Wrapper from "../UI/Wrapper";
import { LoadingPages } from "../UI/Loading";
import { isLoadingPage } from "../Redux/slices/uiProjectSlice";
import { useSelector } from "react-redux";

const StartPage = () => {
  const loadingPage = useSelector((state) => state.rootUi.isLoadingPage);

  return (
    <Wrapper className="relative flex flex-col items-center w-screen h-screen pt-16">
      {isLoadingPage && <LoadingPages isLoadingPage={loadingPage} />}
      <h1 className="text-2xl font-medium lg:text-3xl">
        <span className="font-mono font-light text-black">ALFA</span> Weather
        App°
      </h1>
      <div className="flex items-center justify-center my-5 overflow-hidden rounded-xl md:w-1/4 lg:w-52">
        <img
          src={introWeatherAppImg}
          alt="weather app"
          className="w-32 md:w-full"
        />
      </div>
      <Search />
    </Wrapper>
  );
};

export default StartPage;
