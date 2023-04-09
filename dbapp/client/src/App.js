import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header';
import Spots from './components/Spots';
import Search from './components/Search';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import LoginPage from './user/pages/LoginPage';
import RegisterPage from './user/pages/RegisterPage';

import { AuthContext } from './shared/utils/auth-context';
import { useAuth } from './shared/utils/auth-hook';

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  // If token object is set (i.e., a valid user is logged in):
  if (token) {
    // Set available routes by context.
    routes = (
      <Switch>
        {/* Home Page */}
        <Route path="/" exact>
          <div className="container">
            <Header user="Bob"/>
            <Spots/>
            <Spots title = 'Your Previously Viewed Spots'/>
            <Search />
            <Account title="Your Personal Information"/>
            <Account title="Your Saved Places"/>
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
          <div className="container">
            <Header user="Your Name Here!"/>
            <Spots/>
            <Spots title = 'Your Previously Viewed Spots'/>
            <Search />
            <Account title="Your Personal Information"/>
            <Account title="Your Saved Places"/>
            <div className="forms">
              <Login />
              <Register />
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
