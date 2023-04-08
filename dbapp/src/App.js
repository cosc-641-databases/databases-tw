import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header';
import Spots from './components/Spots';
import Search from './components/Search';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    // Use React Router to handle separate paths in the browser.
    <Router>
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
            <div className="forms">
              <Login />
              <Register />
            </div>
          </div>
        </Route>
        {/* User Login */}
        <Route path="/login" exact>

        </Route>
        {/* User Registration */}
        <Route path="/register" exact>

        </Route>
        {/* Redirect to homepage on 404 */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
