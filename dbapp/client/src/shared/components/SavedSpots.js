import React, { useEffect, useRef, useContext, useState } from 'react';
import Location from '../../components/Location';
import { AuthContext } from '../utils/auth-context';
import axios from 'axios';

const SavedSpots = () => {
  const [locations, setLocations] = useState([]);
  const auth = useContext(AuthContext);
  let locs = useRef([]);
  let url = "";
  const display = [];

  if (auth.isLoggedIn) {
    url = `http://localhost:5000/locations/${auth.userId}`;
  }

  useEffect(() => {
    const getLocations = async () => {
      const res = await axios.get(url);
      const data = await res.data;
      locs.current = await data;
      setLocations(locs.current);
    };
    if (url !== "") {
      getLocations();
    };
  }, [url]);

  if (locations.length > 0) {
    locations.forEach((loc, index) => {
      display.push(
        <div key={index}>
          <Location
            lat={loc.location.lat}
            lon={loc.location.lon}
          />
        </div>
      );
    });
  }

  return (
    <div className="box">
      <h2>Your Saved Locations</h2>
      <div className="savedSpots">
        {display.reverse()}
      </div>
    </div>
  );
}

export default SavedSpots;
