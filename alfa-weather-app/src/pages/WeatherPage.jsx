import React from "react";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import Container from "../UI/Container";

const WeatherPage = () => {
  return (
    <Container className="flex flex-col md:flex-row">
      <CurrentWeather />
    </Container>
  );
};

export default WeatherPage;
