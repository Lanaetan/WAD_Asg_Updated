import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import axios from 'axios';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              q: 'Kuala Lumpur, MY',
              appid: 'e0f24260d515e6220225cf340babff5a',
              units: 'metric',
            },
          },
        );
        if (mounted) {
          setWeather(response.data);
          console.info('Weather fetched!');
        }
      } catch (err) {
        if (mounted) {
          setError('Error fetching weather data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.weatherCard}>
      {loading && (
        <Text style={styles.loadingText}>Loading weather data...</Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {weather && (
        <View style={styles.weatherContent}>
          <View style={styles.weatherInfo}>
            <Text style={styles.cityName}>{weather.name}</Text>
            <View style={styles.weatherDetails}>
              <View style={styles.textContainer}>
                <Text style={styles.temperature}>
                  {Math.round(weather.main.temp)}°C
                </Text>
                <Text style={styles.description}>
                  {weather.weather[0].description.charAt(0).toUpperCase() +
                    weather.weather[0].description.slice(1)}
                </Text>
              </View>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                }}
                style={styles.weatherIcon}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  /* Card Container */
  weatherCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },

  /* Layout Containers */
  weatherContent: {
    flexDirection: 'column',
  },
  weatherInfo: {
    width: '100%',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
  },

  /* Text Styles */
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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

  /* Image Styles */
  weatherIcon: {
    width: 100,
    height: 100,
  },

  /* Status Messages */
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
