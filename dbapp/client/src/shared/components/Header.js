import React, { useContext } from 'react';
import Button from './Button';
import SubHeader from './SubHeader';
import { AuthContext } from '../utils/auth-context';
import { useAuth } from '../utils/auth-hook';
import logo from '../../logo.png';
import './Header.css';

const Header = () => {

    // Use authentication token to get userId.
    const { token, login, logout, userId } = useAuth();
    const auth = useContext(AuthContext);

    let header;

    // If user is authenticated:
    if (token) {
        header = (
            <div>
                <header className='header'>
                    <div className="branding">
                        <img src={ logo } className="logo" alt="logo" />
                        <h1>A.R.M.W.A.</h1>
                    </div>

                    <div className='header'>
                        <Button href="/">HOME</Button>
                        <Button inverse href={`/${auth.userId}/dashboard`}>DASHBOARD</Button>
                        <Button inverse onClick={ auth.logout }>LOGOUT</Button>
                    </div>
                </header>
                <SubHeader />
            </div>
        );
    }
    // If user is NOT authenticated:
    else {
        header = (
            <div>
                <header className='header'>
                    <div className="branding">
                        <img src={logo} className="logo" alt="logo" />
                        <h1>A.R.M.W.A.</h1>
                    </div>
                    <div className='header'>
                        <Button href="/">HOME</Button>
                        <Button inverse href="/register">REGISTER</Button>
                        <Button inverse href="/login">LOGIN</Button>
                    </div>
                </header>
                <SubHeader />
            </div>
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
    { header }
    </AuthContext.Provider>
  );
}

export default Header
