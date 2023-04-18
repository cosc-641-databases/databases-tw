import './Search.css';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../shared/utils/auth-context';
import { useAuth } from '../shared/utils/auth-hook';
import Button from '../shared/components/Button';

const api = {
  key: process.env.REACT_APP_OPENWEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};



function Search() {
  const { token, login, logout, userId } = useAuth();

  // Use authentication token to get userId.
  const auth = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=imperial&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (

    <div>
    {/* <div className = 'search'>
        <label htmlFor = "search">Search for weather in specific locations:</label>
        <br></br>
        <input type="search" id = "search" name = "q"></input>
        <Button color = 'blue' text = 'Search'/>
    </div> */}

    <input
    type="text"
    placeholder="Search City or State"
    onChange={(e) => setSearch(e.target.value)}
    />
    <button onClick={searchPressed}>Search</button>
    <Button onClick={searchPressed}>SEARCH</Button>

    {typeof weather.main !== "undefined" ? (
    <div>
      {/* Location */}
      <p>{weather.name}</p>

      {/* Temperature */}
      <p>{weather.main.temp} °F</p>

      {/* Forecast */}
      <p>{weather.weather[0].main}</p>
      <p>{weather.weather[0].description}</p>
    </div>
    ) : (
    ""
    )}
  </div>
  )
}

export default Search;
