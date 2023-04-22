import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './shared/components/Header';
import Spots from './shared/components/Spots';
import Search from './components/Search';
import Account from './components/Account';
import LoginPage from './user/pages/LoginPage';
import RegisterPage from './user/pages/RegisterPage';
import SettingsPage from './user/pages/SettingsPage';
import { AuthContext } from './shared/utils/auth-context';
import { useAuth } from './shared/utils/auth-hook';

function App() {
  const { token, login, logout, userId } = useAuth();

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
            <div>
              <Search />
              <Spots />
              <Spots title="Your Previously Viewed Spots" />
              <Account title="Your Personal Information" />
              <Account title="Your Saved Places" />
            </div>
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
        {/* User dashboard only available if user is authenticated. */}
        <Route path="/settings">
          <SettingsPage />
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
            <div>
              <Search />
              <Spots/>
            </div>
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
