import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

// Auth token management.
export const useAuth = () => {
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();


  // Token handling upon login.
  const login = useCallback((uid, token, expirationDate) => {
    setUserId(uid);
    setToken(token);
    // Handle token expiration (1 hour).
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    // Storing token expiration in user's local storage.
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  // Token handling upon logout.
  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
    window.location.href="/";
  }, []);

  // Handle logout timer.
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // Handle local data storage.
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout, userId };

};
