import React, { useContext } from 'react';
import Button from './Button';
import SubHeader from './SubHeader';
import { AuthContext } from '../utils/auth-context';
import logo from '../../logo.png';
import './Header.css';

const Header = () => {

    // Use authentication token to get userId.
    const auth = useContext(AuthContext);

    const header = (
        <div>
            <header className='header'>
                <div className="branding">
                    <img src={ logo } className="logo" alt="logo" />
                    <h1>A.R.M.W.A.</h1>
                </div>
                {auth.isLoggedIn && (
                <div className='header'>
                    <Button href="/">HOME</Button>
                    <Button inverse href={`/settings`}>SETTINGS</Button>
                    <Button inverse onClick={ auth.logout }>LOGOUT</Button>
                </div>
                )}
                {!auth.isLoggedIn && (
                    <div className='header'>
                        <Button href="/">HOME</Button>
                        <Button inverse href="/register">REGISTER</Button>
                        <Button inverse href="/login">LOGIN</Button>
                    </div>
                )}
            </header>
            <SubHeader />
        </div>
    );

  return (header);
}

export default Header
