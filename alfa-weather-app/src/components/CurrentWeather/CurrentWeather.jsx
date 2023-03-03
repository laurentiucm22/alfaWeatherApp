import React, { useState } from "react";

import Wrapper from "../../UI/Wrapper";

const CurrentWeather = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState({});

  return <Wrapper className="h-screen">CurrentWeather</Wrapper>;
};

export default CurrentWeather;
