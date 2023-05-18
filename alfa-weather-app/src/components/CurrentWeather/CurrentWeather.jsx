import React from "react";
import Container from "../../UI/Container";
import { useSelector } from "react-redux";
import Wrapper from "../../UI/Wrapper";

const CurrentWeather = () => {
  const currentWeaterList = useSelector(
    (state) => state.rootCurrentWeather.data
  );

  return (
    <Container className="text-center w-full md:w-1/4 rounded-b-lg md:rounded-lg bg-sky-400/[0.5]">
      {currentWeaterList.map((city) => {
        return (
          <Container key={city.cityId} className="flex flex-col items-center">
            <Wrapper className="py-12 mt-10 bg-indigo-700 border-4 rounded-full shadow-md w-36 outline outline-8 outline-indigo-400 border-slate-200">
              <p className="text-4xl ">{city.temp}°</p>
            </Wrapper>

            <p className="p-2 mt-5 text-2xl bg-red-300">{city.cityName}</p>
            <Container className="flex py-3">
              <p className="pr-2">Max: {city.max_temp}°</p>
              <p>Min: {city.min_temp}°</p>
            </Container>
            <p>Feels Like: {city.feels_like}°</p>
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
