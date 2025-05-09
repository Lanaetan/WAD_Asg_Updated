import axios from 'axios';

const API_KEY = 'e0f24260d515e6220225cf340babff5a';
const CITY = 'Kuala Lumpur, MY';

export const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: CITY,
          appid: API_KEY,
          units: 'metric',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw new Error('Error fetching weather data');
  }
};