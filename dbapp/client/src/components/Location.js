import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Location.css';
/////////////////////// IMPORTANT README ///////////////////////////////////////
// This component has been updated to query the weather when Lat/Lon is present
// in the props passed to it.
// Therefore: Do not pass Lat/Lon to this component unless you want the
// component itself to run the weather query. This is used in the SavedSpots
// component to relieve the burden of multiple queries on that one component,
// but it can be used in other places as needed, you just need the Lat/Lon
// values of the city you're retrieving the weather for.
////////////////////////////////////////////////////////////////////////////////

// Component used as cards for each location being displayed within the app.
function Location({location, icon, temp, desc, lat, lon}) {
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
    vars.loc = weather.name;
    vars.country = weather.sys.country;
    vars.temp = weather.main.temp;
    vars.desc = weather.weather[0].description;
    vars.icon = weather.weather[0].icon;
    vars.srcUrl = `http://openweathermap.org/img/w/${vars.icon}.png`
  } else {
    vars.loc = location;
    vars.country = '';
    vars.temp = temp;
    vars.desc = desc;
    vars.srcUrl = `http://openweathermap.org/img/w/${icon}.png`
  }

  return (
    <div className='location'>{vars.loc}, {vars.country}: <br />
      {vars.temp} °F <br />
      <p className='locDesc'><img id="wicon" src={vars.srcUrl} alt="Weather icon"></img> {vars.desc}</p>
    </div>
  )
}

Location.defaultProps = {
  location: '',
  icon: '01d',
  temp: '',
  desc: '',
  lat: null,
  lon: null
}

export default Location;
