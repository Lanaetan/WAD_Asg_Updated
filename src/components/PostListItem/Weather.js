import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
            q: 'Kuala Lumpur, MY',
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
    <View style={styles.weatherCard}>
      <View style={styles.weatherHeader}>
        <Text style={styles.weatherTitle}>Weather Update</Text>
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={getWeather}
        >
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      
      {loading && <Text style={styles.loadingText}>Loading weather data...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {weather && (
        <View style={styles.weatherContent}>
          <Text style={styles.cityName}>{weather.name}</Text>
          <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.description}>
            {weather.weather[0].description.charAt(0).toUpperCase() + 
             weather.weather[0].description.slice(1)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  refreshText: {
    color: '#666',
    fontSize: 14,
  },
  weatherContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    padding: 10,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    padding: 10,
  },
});

export default WeatherApp;