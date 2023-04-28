import React from "react";
import Search from "../components/SearchCity/Search";
import introWeatherAppImg from "../assets/images/weather-app-intro.png";
import { LoadingPages } from "../UI/Loading";
import { isLoadingPage } from "../Redux/slices/uiSlice";
import { useSelector } from "react-redux";
import Container from "../UI/Container";

const StartPage = () => {
  const loadingPage = useSelector((state) => state.rootUi.isLoadingPage);

  return (
    <Container className="relative flex flex-col items-center pt-16">
      {isLoadingPage && <LoadingPages isLoadingPage={loadingPage} />}
      <h1 className="text-2xl font-medium lg:text-3xl text-slate-100 drop-shadow-md">
        <span className="font-mono font-light text-black">ALFA</span> Weather
        App°
      </h1>
      <div className="flex items-center justify-center my-5 overflow-hidden rounded-xl md:w-52 lg:w-52">
        <img
          src={introWeatherAppImg}
          alt="weather app"
          className="w-32 md:w-full"
        />
      </div>
      <Search />
    </Container>
  );
};

export default StartPage;
