// GEO Location API
const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_GEOLOCATION_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_GEOLOCATION_API_HOST,
  },
};
const GEO_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const fetchGeoLocationData = async (inputValue = "") => {
  let response;

  if (inputValue !== "") {
    const GEO_API_URL = `${GEO_BASE_URL}/cities?limit=10&minPopulation=20000&namePrefix=${inputValue}`;

    try {
      const data = await fetch(GEO_API_URL, geoApiOptions);
      if (!data || !data.ok) return;
      response = await data.json();
    } catch (err) {
      console.warn(err);
    }

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

export const fetchCurrentWeatherData = async (cords = {}) => {
  if (cords) {
    const cityName = cords.city;
    const CURRENT_WEATHER_URL = `${CURRENT_WEATHER_BASE_URL}?lat=${cords.lat}&lon=${cords.lon}`;

    let response;

    try {
      const data = await fetch(CURRENT_WEATHER_URL, currentWeatherApiOptions);

      if (!data.ok) throw new Error(`${data.status}`);

      response = await data.json();

      const transformedDataObj = {
        ...response,
        cityName,
      };

      return transformedDataObj;
    } catch (err) {
      console.warn(err);
    }
  }
  return;
};

fetchCurrentWeatherData();
