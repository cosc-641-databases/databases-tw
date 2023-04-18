import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './shared/components/Header';
import Spots from './shared/components/Spots';
import Search from './components/Search';
import Account from './components/Account';
import LoginPage from './user/pages/LoginPage';
import RegisterPage from './user/pages/RegisterPage';
import { AuthContext } from './shared/utils/auth-context';
import { useAuth } from './shared/utils/auth-hook';

const api = {
    key: process.env.REACT_APP_OPENWEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
  };

function App() {
  const { token, login, logout, userId } = useAuth();

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=imperial&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  let routes;

  // If token object is set, a valid user is logged in.
  if (token) {
    // Set available routes by context.
    routes = (
      <Switch>
        {/* Home Page */}
        <Route path="/" exact>
          <div className="App">
            <header className="App-header">
              <Header />
            </header>
            <body>
              <input
                type="text"
                placeholder="Search City or State"
                onChange={(e) => setSearch(e.target.value)}
              />
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
              <Search />
              <Spots />
              <Spots title = 'Your Previously Viewed Spots' />
              <Account title="Your Personal Information" />
              <Account title="Your Saved Places" />


            </body>
          </div>
        </Route>
        {/* User Login */}
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        {/* User Registration */}
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        {/* Redirect to homepage on 404 */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    // Set available routes by context.
    routes = (
      <Switch>
        {/* Home Page */}
        <Route path="/" exact>
          <div className="App">
            <header className="App-header">
              <Header />
            </header>
            <body>
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search City or State"
                onChange={(e) => setSearch(e.target.value)}
              />
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
              <Search />
              <Spots/>
            </body>
          </div>
        </Route>
        {/* User Login */}
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        {/* User Registration */}
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        {/* Redirect to homepage on 404 */}
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <main>{ routes }</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
