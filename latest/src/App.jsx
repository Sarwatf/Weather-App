import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const apiKey = '38e335b8df7785b9dc5e805c4ddcb61e';
  const [city, setCity] = useState('');

  const getWeather = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeather(response.data);
      setError(null)
    } catch (error) {
      setError('city not found');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <div style={styles.container }>
      <h1 style={styles.h1}>Weather <span>Application</span></h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter City/Country Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <br />
        <button type="submit" style={styles.button}>
          Get Weather
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {weather && (
        <div style={styles.weather}>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{Math.round(weather.main.temp - 273.15)} °C</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    
    height: '100vh',
    
  },
  container:{
    // border :' 4px solid pink',
    marginLeft: '350px',
    marginRight: 'auto',
    padding : '20px 40px',
    marginTop : ' 20px',
    marginBottom: '150px',
    borderRadius : '10px'
    
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    margin: '20px',
    cursor: 'pointer',
    color: 'white',
    border: 'solid 2px black',
    backgroundColor: 'purple',
  },
  h1: {
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign : 'center'
  },
  weather: {
    textAlign: 'center',
  },
};

export default App;