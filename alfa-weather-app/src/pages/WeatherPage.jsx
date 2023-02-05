import React from "react";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import Wrapper from "../UI/Wrapper";

const WeatherPage = () => {
  return (
    <Wrapper className="h-screen">
      <CurrentWeather />
    </Wrapper>
  );
};

export default WeatherPage;
