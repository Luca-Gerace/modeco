import { Link, useLocation } from "react-router-dom";
import { SidebarWithBurgerMenu } from "./SidebarWithBurgerMenu";
import { Button } from "@material-tailwind/react"; 
import { SidebarCart } from "./Cart/SidebarCart";
import { useUser } from "../modules/UserContext";

export default function Navbar({ cartCount, setCartCount }) {
  const { user } = useUser();
  const location = useLocation();

  const hideSidebarCart = location.pathname === '/checkout' || location.pathname === '/thank-you';

  return (
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
        <ul className="flex items-center gap-8">
          {user ? (
            <>
              {!hideSidebarCart && (
                <li>
                  <SidebarCart cartCount={cartCount} setCartCount={setCartCount} />
                </li>
              )}
              <li>
                <Link to="/profile">
                  <img src={user.avatar} alt='user image' className="w-[50px] h-[50px] rounded-full" />
                </Link>
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
  );
}
