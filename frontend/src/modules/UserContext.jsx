import { createContext, useContext, useState, useEffect } from 'react';
import { getUserData } from '../services/api';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getUserData();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user data', error);
          setUser(null);
        }
      }
    };
    checkLoginStatus();
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
