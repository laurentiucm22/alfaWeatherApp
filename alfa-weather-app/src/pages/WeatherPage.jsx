import React from "react";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import Container from "../UI/Container";

const WeatherPage = () => {
  return (
    <Container className="flex justify-center bg-sky-400">
      <CurrentWeather />
    </Container>
  );
};

export default WeatherPage;
