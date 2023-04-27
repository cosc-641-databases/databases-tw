import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../utils/auth-context';
import HomeLocation from '../../components/HomeLocation';
import axios from 'axios';
import "./SubHeader.css";

const HomeWeather = () => {

  const auth = useContext(AuthContext);
  const [user, setUser] = useState({});
  let url, lat, lon = "";
  if (auth.isLoggedIn) {
    url = `http://localhost:5000/user/${auth.userId}`
  }

  // Retrieve the user object from MongoDB so it can be displayed.
  useEffect(() => {
    const getUserObj = async () => {
      const res = await axios.get(url);
      const data = await res.data;
      setUser(data);
    }
    if (url !== "") {
      getUserObj();
    }
  }, [url]);

  // If the name object exists inside our user state, assign fname to variable.
  if (user.location) {
    lat = user.location['lat'];
    lon = user.location['lon'];
  }

  return (
    <HomeLocation
      lat={lat}
      lon={lon}
    />
  );

}

export default HomeWeather;
