

import React, { useState } from 'react';
import Style from './weather.module.css';

let Weather = () => {
  let [city, setCity] = useState("Bangalore");
  let [WeatherInfo, SetWeatherInfo] = useState(null);

  let fetchApi = async () => {
    let apiKey = "50766f4bc70b3a7827cee794ac0bf77a"; 
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      let data = await fetch(apiUrl);
      let finalData = await data.json();

      if (finalData.cod === 200) {
        SetWeatherInfo(finalData);
        console.log(finalData);
      } else {
        console.log("error:", finalData.message);
      }
    } catch (error) {
      console.log("Error fetching the API:", error);
    }
  };

  return (
    <section>
      <input 
        type="text"
        placeholder="Enter your city name"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchApi}>Get weather report</button>

      <div>
        {WeatherInfo && (
          <>
            <h1>City Name: {WeatherInfo.name}</h1>
            <h1>Temperature: {WeatherInfo.main.temp} °C</h1>
            <h2>Country: {WeatherInfo.sys.country}</h2>
            <h3>Weather Description: {WeatherInfo.weather[0].description}</h3>
          </>
        )}
      </div>
    </section>
  );
};

export default Weather;

