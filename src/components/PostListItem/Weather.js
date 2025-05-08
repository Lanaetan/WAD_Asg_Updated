import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather', 
        {
          params: {
            q: 'Kuala Lumpur,MY', // City Name
            appid: 'e0f24260d515e6220225cf340babff5a', 
            units: 'metric' 
          }
        }
      );
      setWeather(response.data);
      console.info("Weather fetched!");
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View>
      <Button title="Get Weather" onPress={getWeather} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {weather && (
        <View>
          <Text>{weather.name}</Text>
          <Text>{weather.main.temp}°C</Text>
        </View>
      )}
    </View>
  );
};

export default WeatherApp;
