import React, { useEffect, useRef, useState, useContext } from 'react';
import { AuthContext } from '../../shared/utils/auth-context';
import Header from '../../shared/components/Header';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import SavedSpots from '../../shared/components/SavedSpots';
// import Spots from '../../shared/components/Spots';
import './SettingsPage.css';
import axios from 'axios';

const SettingsPage = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loc, setLoc] = useState({});
  const [dis, setDis] = useState(true);
  const [edit, setEdit] = useState("EDIT");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [locName, setLocName] = useState('');
  const [countryName, setCountryName] = useState('');

  let url, fname, lname, username, location = "";
  let url2 = useRef("");
  // const orig = {};
  if (auth.isLoggedIn) {
    url = `http://localhost:5000/user/${auth.userId}`;
  }

  // Retrieve asynchronous data.
  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(url);
      const data = await res.data;
      setUser(data);
      url2.current = `http://api.openweathermap.org/geo/1.0/reverse?lat=${data.location['lat']}&lon=${data.location['lon']}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
      const res2 = await axios.get(url2.current);
      const data2 = await res2.data;
      // Set state values.
      setLoc(data2);
      setFirstName(data.name['fname']);
      setLastName(data.name['lname']);
      setLocName(data2[0].name);
      setCountryName(data2[0].country);
    }
    if (url !== "") {
      getUserData();
    }
  }, [url, url2]);

  // Set global variables for use in rendered output.
  if (user.name) {
    fname = user.name['fname'];
    lname = user.name['lname'];
    username = user['username'];
    if (loc[0]) {
      location = loc;
    }
  }

  const setDisabledStatus = () => {
    setDis(!dis);
    setEdit(edit==="EDIT" ? "LOCK" : "EDIT");
  }

  // When "Update" on user info form is submitted.
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const axiosConfigs = {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'Token',
          "Access-Control-Allow-Origin": "*"
        }
      };
      const url = `http://localhost:5000/update/${auth.userId}`;
      // Use axios package to post new data via http request body.
      await axios.post(url,
        JSON.stringify({
          origFName: user.name['fname'],
          origLName: user.name['lname'],
          origLoc: location[0].name,
          origCountry: location[0].country,
          fname: firstName,
          lname: lastName,
          city: locName,
          country: countryName
        }),
        axiosConfigs
      ).then((res) => {
        if (res.status === 200) {
          // If successful, reload the page.
          window.location.reload();
        }
      });
    } catch(err) {
      console.log("Update failed!");
    }
  }

  return (
    <div className="wrapper">
      <Header />
      <Card className="settings">
        <h3>User Account Info<br /><br />
          <Button onClick={setDisabledStatus} type="submit">{edit}</Button>
        </h3>
        <form className="user-settings" onSubmit={submitHandler}>
          <fieldset disabled={ dis }>
            <legend>User Info</legend>
            <p>Username: <strong>{username}</strong></p><br />
            <label
              htmlFor="fname">First Name: </label>
            <input
              type="text"
              id="fname"
              defaultValue={fname}
              onChange={(ev) => setFirstName(ev.target.value)}
            /><br />
            <label htmlFor="lname">Last Name: </label>
            <input
              type="text"
              id="lname"
              defaultValue={lname}
              onChange={(ev) => setLastName(ev.target.value)}
            /><br />
            {location && (
              <div>
                <label htmlFor="location">Location: </label>
                <input
                  type="text"
                  id="location"
                  defaultValue={location[0].name}
                  onChange={(ev) => setLocName(ev.target.value)}
                /><br />
                <label htmlFor="country">Country Code: </label>
                <input
                  type="text"
                  id="country"
                  defaultValue={location[0].country}
                  onChange={(ev) => setCountryName(ev.target.value)}
                />
              </div>
            )}
            <Button type="submit" inverse>
              UPDATE
            </Button>
          </fieldset>
        </form>
        <form className="location-settings">
          <fieldset disabled={ dis }>
            <legend>Home Location</legend>
            {location && (
              <div>
                <p>Name: <strong>{location[0].name}</strong></p>
                <p>State: <strong>{location[0].state}</strong></p>
                <p>
                  Latitude: <strong>{location[0].lat}</strong><br />
                  Longitude: <strong>{location[0].lon}</strong>
                </p>
                <p>Country: <strong>{location[0].country}</strong></p>
              </div>
            )}
          </fieldset>
        </form>
      </Card>
      <Card className="settings">
        <SavedSpots />
      </Card>
    </div>
  );
};

export default SettingsPage;
