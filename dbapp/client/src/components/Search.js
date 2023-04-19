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

  const savePressed = () => {
    //add current location information as a saved location for this user
    //will need current user's username
  }

  return (

  <div>

    <input
    type="text"
    placeholder="Search City or State"
    onChange={(e) => setSearch(e.target.value)}
    />
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
      {/* If token object is set, a valid user is logged in. */}
      if (token) {
        //allow user to save the location 
        (<Button onClick={savePressed}>SAVE LOCATION</Button>)
      }
    </div>
    ) : (
    ""
    )}
  </div>
  )
}

export default Search;
