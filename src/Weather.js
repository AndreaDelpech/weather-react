import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";

export default function Weather(props) {
  const [weatherdata, setWeatherdata] = useState({ ready: false });

  function handleResponse(response) {
    console.log(response.data);

    setWeatherdata({
      ready: true,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      city: response.data.name,
      date: "Wednesday 13:00",
    });
  }

  if (weatherdata.ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a City"
                className="form-control"
                autoFocus="on"
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>

        <h1>{weatherdata.city}</h1>
        <ul>
          <li>{weatherdata.date} </li>
          <li className="text-capitalize">{weatherdata.description}</li>
        </ul>

        <div className="row ">
          <div className="col-6">
            <img src={weatherdata.icon} alt={weatherdata.description} />
            <span className="temperature">
              {Math.round(weatherdata.temperature)}
            </span>
            <span className="unit">°C</span>
          </div>
          <div className="col-6">
            <ul>
              <li>Humidity: {weatherdata.humidity}% </li>
              <li>Wind: {Math.round(weatherdata.wind)} km/h </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "64469ac67e6dc941feb5b50915a18dc7";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(handleResponse);

    return "Loading...";
  }
}
