import './Search.css';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../shared/utils/auth-context';
import Button from '../shared/components/Button';
import Location from './Location';
import axios from 'axios';

function Search() {
  const auth = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [save, setSave] = useState(false);
  const axiosConfigs = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'Token',
      "Access-Control-Allow-Origin": "*"
    }
  };

  const searchPressed = async (event) => {
    event.preventDefault();
    let data;
    if (search !== '') {
      try {
        // Moved data fetch into server to prevent API key exposure
        // upon bad/malformed location request.
        await axios.post(
          'http://localhost:5000/search',
          JSON.stringify({
            search: search
          }),
          axiosConfigs
        )
        .then((res) => {
          data = res.data;
          if (data.cod !== "404") {
            setWeather(data);
            setSave(true);
          }
        });
      } catch(err) {
        console.log("Could not complete request.");
      }
    }
  };

  // Handler for when the SAVE LOCATION button is pressed.
  const savePressed = async (event) => {
    event.preventDefault();
    let data;
    // Add currently searched location to Saved Locations in MongoDB.
    if (weather.cod === 200) {
      try {
        await axios.post(
          'http://localhost:5000/saveLoc',
          JSON.stringify({
            uID: auth.userId,
            name: weather.name,
            lat: weather.coord.lat,
            lon: weather.coord.lon
          }),
          axiosConfigs
        )
        .then(async (res) => {
          data = await res.data;
          window.location.reload();
        });
      } catch(err) {
        console.log("Could not complete request.", err);
      }
    }
  }

  return (
  <div className="search">
    <input
      className="searchBox"
      type="text"
      placeholder="Search by City"
      onChange={(e) => setSearch(e.target.value)}
    />
    <Button onClick={ searchPressed }>SEARCH</Button>
    {save && search && auth.isLoggedIn && (
      //allow user to save the location
      (<Button onClick={ savePressed }>SAVE LOCATION</Button>)
    )}
      <hr />
    {typeof weather.main !== "undefined" ? (
      <Location
        location={weather.name}
        icon={weather.weather[0].icon}
        temp={weather.main.temp}
        desc={weather.weather[0].description}
      />
    ) : (
    ""
    )}
  </div>
  );

}

export default Search;
