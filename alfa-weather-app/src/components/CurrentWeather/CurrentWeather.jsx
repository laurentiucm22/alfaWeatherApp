import React from "react";

import Wrapper from "../../UI/Wrapper";
import { useSelector } from "react-redux";

const CurrentWeather = () => {
  const currentWeaterList = useSelector(
    (state) => state.rootCurrentWeather.data
  );

  return (
    <Wrapper className="h-screen">
      {currentWeaterList.map((city) => {
        return (
          <Wrapper key={city.cityId}>
            <p>{city.cityName}</p>
            <p>{city.temp}</p>
            <p>{city.max_temp}</p>
            <p>{city.min_temp}</p>
          </Wrapper>
        );
      })}
    </Wrapper>
  );
};

export default CurrentWeather;
