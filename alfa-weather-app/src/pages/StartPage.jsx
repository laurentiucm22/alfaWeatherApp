import React from "react";
import Search from "../components/SearchCity/Search";
import introWeatherAppImg from "../assets/images/weather-app-intro.png";
import Wrapper from "../UI/Wrapper";

const StartPage = () => {
  return (
    <Wrapper className="flex flex-col items-center w-screen h-screen pt-16">
      <h1 className="text-2xl font-medium lg:text-3xl">
        <span className="font-mono font-light text-black">ALFA</span> Weather
        App°
      </h1>
      <div className="flex items-center justify-center my-5 overflow-hidden rounded-xl md:w-1/4 lg:w-52">
        <img
          src={introWeatherAppImg}
          alt="weather app"
          className="w-40 md:w-full"
        />
      </div>
      <Search />
    </Wrapper>
  );
};

export default StartPage;
