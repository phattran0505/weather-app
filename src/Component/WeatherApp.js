import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import clear from "../assets/Image/clear.png";
import cloud from "../assets/Image/cloud.png";
import drizzle from "../assets/Image/drizzle.png";
import humidity from "../assets/Image/humidity.png";
import rain from "../assets/Image/rain.png";
import snow from "../assets/Image/snow.png";
import wind from "../assets/Image/wind.png";
import "./WeatherApp.scss";
import { useState } from "react";
function WeatherApp() {
  const [weatherIcon, setWeatherIcon] = useState(cloud);
  const search = async () => {
    const input = document.querySelector(".input");
    if (input.value === "") {
      return 0;
    }
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      input.value
    )}&units=Metric&appid=864a71a924c734f65a75067575111276`;
    let res = await fetch(api);
    let data = await res.json();

    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");
    const temp = document.querySelector(".weather-temp");
    const location = document.querySelector(".weather-location");

    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = Math.floor(data.wind.speed) + "Km/h";
    temp.innerHTML = Math.floor(data.main.temp) + "°C";
    location.innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWeatherIcon(clear);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWeatherIcon(cloud);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWeatherIcon(drizzle);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWeatherIcon(drizzle);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWeatherIcon(rain);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWeatherIcon(rain);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWeatherIcon(snow);
    } else {
      setWeatherIcon(clear);
    }
  };
 
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" placeholder="Search" className="input"></input>
        <div className="icon" onClick={search}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <div className="weather-img">
        <img src={weatherIcon} alt="no-weather" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="no-img"></img>
          <div className="data">
            <div className="humidity">87%</div>
            <div className="text">humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="no-img"></img>
          <div className="data">
            <div className="wind">18 Km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
