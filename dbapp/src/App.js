import './App.css';
import Header from './components/Header';
import Spots from './components/Spots';
import Search from './components/Search';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
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
  );
}

export default App;
