import { createContext } from 'react';

// React's createContext method allows us to store a global object, like the
// authentication status of a user, without passing it around with props.
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});
