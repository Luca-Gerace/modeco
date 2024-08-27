import { getUserData } from "../services/api";
import { useState, useEffect } from "react";
import { Link } from "@mui/material";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getUserData();
          setUser(userData);
          setIsLoggedIn(true);
        } catch (err) {
          console.error('Token not valid', err);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();

    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loginStateChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStateChange", handleStorageChange);
    };
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Welcome back {user.name}</h1>
        </>
      ) : (
        <>
          <div className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/register" className="nav-link">
              Registrati
            </Link>
          </div>
        </>
      )}
    </>
  )
}