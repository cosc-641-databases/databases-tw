import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Header from './components/Header';
import Spots from './components/Spots';
import Search from './components/Search';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';

const api = {
  key: "1029b7749f86c947463079eba18c961d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Starting point for our Databases II project
        </p>
        
        <Header user="Bob"/>
        <Spots/>
        <Spots title = 'Your Previously Viewed Spots'/>
        <Search />
        <Account title="Your Personal Information"/>
        <Account title="Your Saved Places"/>
        <div className="forms">
          <Login />
          <Register />
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search City or State"
          onChange={(e) => setSearch(e.target.value)}>
        </input>

        <button onClick={searchPressed}>Search</button>

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
      </header>
    </div>
  );
}

export default App;
