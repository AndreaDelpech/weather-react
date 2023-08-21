import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";
import WeatherInfo from "./WeatherInfo.js";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
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
      date: new Date(response.data.dt * 1000),
    });
  }

  function search() {
    const apiKey = "64469ac67e6dc941feb5b50915a18dc7";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherdata.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a City"
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
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

        <WeatherInfo data={weatherdata} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
