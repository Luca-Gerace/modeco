import { useEffect, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ShoppingCartIcon,
  SparklesIcon,
  UsersIcon,
  TruckIcon,
  CheckBadgeIcon,
  NewspaperIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { getUserData } from "../services/api";

export function SidebarWithBurgerMenu() {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload()
  };


  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLinkClick = () => {
    closeDrawer(); // Chiude il menu quando si clicca su un link
  };

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Link to="/" onClick={handleLinkClick}>
              <img 
                src='https://res.cloudinary.com/dicfymkdl/image/upload/v1722538420/modeco-logo-light_qfngkh.svg' 
                alt='Modeco logo' 
                className="w-[150px]" 
              />
            </Link>
          </div>
          <List>
            {isLoggedIn && user ? (
              <>
                <Link to="/products" onClick={handleLinkClick}>
                  <ListItem>
                    <ListItemPrefix>
                      <ShoppingCartIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </Link>
                <Link to="/brands" onClick={handleLinkClick}>
                  <ListItem>
                    <ListItemPrefix>
                      <SparklesIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Brands
                  </ListItem>
                </Link>
                <Link to="/licenses" onClick={handleLinkClick}>
                  <ListItem>
                    <ListItemPrefix>
                      <CheckBadgeIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Green licenses
                  </ListItem>
                </Link>
                <Link to="/posts" onClick={handleLinkClick}>
                  <ListItem>
                    <ListItemPrefix>
                      <NewspaperIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Blog posts
                  </ListItem>
                </Link>
                <Link to="/users" onClick={handleLinkClick}>
                  <ListItem>
                    <ListItemPrefix>
                      <UsersIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Users
                  </ListItem>
                </Link>
                <Link to="/orders" onClick={handleLinkClick}>
                  <ListItem>
                    <ListItemPrefix>
                      <TruckIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                </Link>
                <hr className="my-4" />
                <Link to="/profile" onClick={handleLinkClick}>
                  <ListItem>
                    <ListItemPrefix>
                      <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Profile
                  </ListItem>
                </Link>
                <a onClick={() => { handleLogout(); handleLinkClick(); }}>
                  <ListItem>
                    <ListItemPrefix>
                      <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                  </ListItem>
                </a>
              </>
            ) : (
              <>
                <Link to="/login" onClick={handleLinkClick}>
                  <ListItem>
                    <ListItemPrefix>
                      <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Login
                  </ListItem>
                </Link>
                <Link to="/register" onClick={handleLinkClick}>
                    <ListItem>
                      <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Register
                    </ListItem>
                </Link>
              </>
            )}
          </List>
        </Card>
      </Drawer>
    </>
  );
}