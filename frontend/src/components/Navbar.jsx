import { Link } from "react-router-dom";
import { getUserData } from "../services/api";
import { useState, useEffect } from "react";
import { SidebarWithBurgerMenu } from "./SidebarWithBurgerMenu";
import { Button } from "@material-tailwind/react";
import { SidebarCart } from "./Cart/SidebarCart";

export default function Navbar() {
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

  const fallbackAvatar = "https://res.cloudinary.com/dicfymkdl/image/upload/v1721642624/avatar_rsyffw.png";

  return (
    <>
      <nav className="w-full px-4 py-6 shadow-lg bg-white">
        <div className="w-full lg:w-[1024px] flex justify-between items-center m-auto">
          <div className="flex items-center gap-4">
            <SidebarWithBurgerMenu />
            <Link to="/">
              <img 
                src='https://res.cloudinary.com/dicfymkdl/image/upload/v1722538420/modeco-logo-light_qfngkh.svg' 
                alt='Modeco logo' 
                className="w-[150px]" 
              />
            </Link>
          </div>
          <ul className="flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/wishlist" className="nav-link">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <SidebarCart />
                </li>
                <li>
                  {user ? (
                    <Link to="/profile">
                      <img src={user.avatar ? user.avatar : fallbackAvatar} alt='user image' className="w-[50px] h-[50px] rounded-full" />
                    </Link>
                  ) : null}
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <Button className="rounded-full">
                      Login
                    </Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <Button className="rounded-full" variant="outlined">
                      Sign up
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}