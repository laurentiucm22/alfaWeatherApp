// GEO Location API
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_GEOLOCATION_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_GEOLOCATION_API_HOST,
  },
};
export const GEO_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const fetchGeoLocationData = async (inputValue = "") => {
  try {
    let response;

    if (inputValue !== "") {
      const GEO_API_URL = `${GEO_BASE_URL}/cities?limit=10&minPopulation=20000&namePrefix=${inputValue}`;

      const data = await fetch(GEO_API_URL, geoApiOptions);

      if (!data || !data.ok) throw new Error(`${data.status}: Invalid data!`);

      response = await data.json();

      const transformedDataObj = response.data.map((data) => {
        const {
          id = 1,
          city = "Your city!",
          country = "Your country!",
          countryCode = "Your Country Code",
          latitude = 1.0,
          longitude = 1.0,
        } = data;

        return {
          id: id,
          city: city,
          country: country,
          countryCode: countryCode,
          lat: latitude,
          lon: longitude,
        };
      });

      return transformedDataObj;
    }
    return;
  } catch (err) {
    console.warn(err);
    throw err;
  }
};

// CURRENT WEATHER API
const currentWeatherApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_CURRENT_WEATHER_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_CURRENT_WEATHER_API_HOST,
  },
};

const CURRENT_WEATHER_BASE_URL =
  "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather";

export const fetchCurrentWeatherData = async (coords = {}) => {
  if (coords.lat && coords.lon) {
    const cityName = coords.city;
    const CURRENT_WEATHER_URL = `${CURRENT_WEATHER_BASE_URL}?lat=${coords.lat}&lon=${coords.lon}`;

    let response;

    try {
      const data = await fetch(CURRENT_WEATHER_URL, currentWeatherApiOptions);

      if (!data.ok)
        throw new Error(`${data.status}: Missing current weather data!`);

      response = await data.json();

      const transformedDataObj = {
        ...response,
        cityName,
      };
      console.log(transformedDataObj);

      return transformedDataObj;
    } catch (err) {
      console.warn(err);
      throw err;
    }
  }
  return;
};
