import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUserData } from "../services/api";
import { useState, useEffect } from "react";
import { SidebarWithBurgerMenu } from "./SidebarWithBurgerMenu";
import { SidebarCart } from "./Cart/SidebarCart";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      // TODO: Remove this
      console.log(token);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const fallbackAvatar = "https://res.cloudinary.com/dicfymkdl/image/upload/v1721642624/avatar_rsyffw.png";

  return (
    <>
      <nav className="w-full px-4 py-6">
        <div className="w-full lg:w-[1024px] flex justify-between items-center m-auto">
          <div className="flex items-center gap-6">
            <SidebarWithBurgerMenu />
            <Link to="/">
              <img 
                src='https://res.cloudinary.com/dicfymkdl/image/upload/v1722538420/modeco-logo-light_qfngkh.svg' 
                alt='Modeco logo' 
                className="w-[150px]" 
              />
            </Link>
          </div>
          <ul className="flex items-center gap-12">
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
                    <div className="flex items-center gap-4">
                      <img src={user.avatar ? user.avatar : fallbackAvatar} alt='user image' className="w-[50px] h-[50px] rounded-full" />
                      <div className="flex flex-col text-left">
                        <span>{user.name} {user.surname}</span>
                        <a className="text-[12px] underline cursor-pointer" onClick={handleLogout}>Logout</a>
                      </div>
                    </div>
                  ) : null}
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Registrati
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="w-full px-4 py-6 border-t border-[#000] shadow-md">
        <div className="w-full lg:w-[1024px] flex m-auto">
          <div className="flex items-center justify-between gap-6">
            <NavLink 
              to="/clothes" 
              className={({ isActive }) => 
                `font-bold hover:underline transition-all ${isActive ? 'text-green-500 underline' : ''}`
              }
            >
              Abbigliamento
            </NavLink>
            <NavLink 
              to="/cosmetics" 
              className={({ isActive }) => 
                `font-bold hover:underline transition-all ${isActive ? 'text-green-500 underline' : ''}`
              }
            >
              Cosmetici
            </NavLink>
            <NavLink 
              to="/food-and-beverage" 
              className={({ isActive }) => 
                `font-bold hover:underline transition-all ${isActive ? 'text-green-500 underline' : ''}`
              }
            >
              Healthy food
            </NavLink>
            <NavLink 
              to="/second-hand" 
              className={({ isActive }) => 
                `font-bold hover:underline transition-all ${isActive ? 'text-green-500 underline' : ''}`
              }
            >
              Second hand
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}