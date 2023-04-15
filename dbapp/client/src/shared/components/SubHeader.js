import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../utils/auth-context';
import axios from 'axios';
import "./SubHeader.css";

const SubHeader = () => {

  const auth = useContext(AuthContext);
  const [user, setUser] = useState({});
  let fname = "";
  let url = "";
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
  if (user.name) {
    fname = user.name['fname'];
  }

  return (
    <div className="subheader">
      <div>
        <h3>Awesome React & MongoDB Weather App!</h3>
      </div>
      <div>
        {auth.isLoggedIn && (
          <p className="welcomeUser">Welcome, {fname}!</p>
        )}
        {!auth.isLoggedIn && (
          <p>Please login/register.</p>
        )}
      </div>
    </div>
  );
}

export default SubHeader;
