import { getUserData } from "../services/api";
import { useState, useEffect } from "react";
import { Link } from "@mui/material";
import { IconizedCard } from "../components/IconizedCard";
import {
  ShoppingCartIcon,
  SparklesIcon,
  UsersIcon,
  TruckIcon,
  CheckBadgeIcon,
  NewspaperIcon
} from "@heroicons/react/24/solid";

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

  const SECTIONS = [
    { icon: ShoppingCartIcon, title: 'Products', link: '/products' },
    { icon: SparklesIcon, title: 'Brands', link: '/brands' },
    { icon: CheckBadgeIcon, title: 'Green licenses', link: '/licenses' },
    { icon: NewspaperIcon, title: 'Blog posts', link: '/posts' },
    { icon: UsersIcon, title: 'Users', link: '/users' },
    { icon: TruckIcon, title: 'Orders', link: '/orders' },
  ];

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1 className="text-[40px] font-bold">Welcome back {user.name}</h1>
          <p className="">What would you like to do today?
          Let&apos;s make the world a better place together!</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10">
            {SECTIONS.map((section, index) => (
              <IconizedCard
                key={index}
                icon={section.icon}
                title={section.title}
                link={section.link}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="nav-item">
            <Link href="/login" className="nav-link">
              Login
            </Link>
          </div>
          <div className="nav-item">
            <Link href="/register" className="nav-link">
              Registrati
            </Link>
          </div>
        </>
      )}
    </>
  );
}
