import React from "react";
import Container from "../../UI/Container";
import { useSelector } from "react-redux";

const CurrentWeather = () => {
  const currentWeaterList = useSelector(
    (state) => state.rootCurrentWeather.data
  );

  return (
    <Container className="border-2 border-indigo-500">
      {currentWeaterList.map((city) => {
        return (
          <Container key={city.cityId}>
            <p className="text-2xl">{city.cityName}</p>
            <p>Temp: {city.temp}°</p>
            <p>Temp Max: {city.max_temp}°</p>
            <p>Temp Min: {city.min_temp}°</p>
            <p>Feels Like: {city.feels_like}</p>
            <p>Humidity: {city.humidity}%</p>
            <p>Sunrise: {city.sunrise}</p>
            <p>Sunset: {city.sunset}</p>
            <p>Wind Degrees: {city.wind_degrees}</p>
            <p>Wind Speed: {city.wind_speed}</p>
          </Container>
        );
      })}
    </Container>
  );
};

export default CurrentWeather;
