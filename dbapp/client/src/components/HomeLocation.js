import React, { useEffect, useState } from 'react';
import Button from '../shared/components/Button';
import axios from 'axios';
import './HomeLocation.css';

// Component used as cards for each location being displayed within the app.
function HomeLocation({lat, lon}) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      const axiosConfigs = {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'Token',
          "Access-Control-Allow-Origin": "*"
        }
      };
      await axios.post(
        'http://localhost:5000/locations/latlon',
        {
          lat: lat,
          lon: lon
        },
        axiosConfigs
      )
      .then((res) => {
        setWeather(res.data);
      });
    }
    if (lat !== null && lon !== null) {
      getWeatherData();
    }
  }, [lat, lon]);

  // The `weather` state variable is only set if Lat/Lon were included in props.
  const vars = {}
  if (weather !== null) {
    console.log(weather);
    vars.loc = weather.name;
    vars.country = weather.sys.country;
    vars.temp = weather.main.temp;
    vars.hum = weather.main.humidity;
    vars.feels = weather.main.feels_like;
    vars.desc = weather.weather[0].description;
    vars.icon = weather.weather[0].icon;
    vars.wind = weather.wind.speed;
    vars.clouds = weather.clouds.all;
    if (weather.rain) {
      vars.rain = weather.rain['1h'] + " MM";
    } else {
      vars.rain = 'N/A';
    }
    vars.srcUrl = `http://openweathermap.org/img/w/${vars.icon}.png`
  }

  return (
    <div className="box">
      <table>
        <thead>
          <tr>
            <th colSpan="2">YOUR WEATHER</th>
          </tr>
          <tr>
            <th colSpan="2">{vars.loc}, {vars.country}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Temperature: </td>
            <td>{vars.temp} &deg;F</td>
          </tr>
          <tr>
            <td>Feels Like: </td>
            <td>{vars.feels} &deg;F</td>
          </tr>
          <tr>
            <td>Humidity: </td>
            <td>{vars.hum}%</td>
          </tr>
          <tr>
            <td>Wind: </td>
            <td>{vars.wind} MPH</td>
          </tr>
          <tr>
            <td>Cloud Cover: </td>
            <td>{vars.clouds}%</td>
          </tr>
          <tr>
            <td>Rain: </td>
            <td>{vars.rain}</td>
          </tr>
          <tr>
            <td>Description: </td>
            <td>
              <img id="wicon" src={vars.srcUrl} alt="Weather icon"></img>
              {vars.desc}
              <img id="wicon" src={vars.srcUrl} alt="Weather icon"></img>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="updateBtn">
              <Button inverse href={`/settings`}>UPDATE</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

Location.defaultProps = {
  lat: null,
  lon: null
}

export default HomeLocation;
