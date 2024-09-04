import { Link } from "react-router-dom";
import { useUser } from "../modules/UserContext";
import { SidebarWithBurgerMenu } from "./SidebarWithBurgerMenu";
import { Button } from "@material-tailwind/react";

export default function Navbar() {
  const { user } = useUser();

  return (
    <>
      <nav className="w-full px-4 py-6 border-b-2	border-[#000]">
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
            {user ? (
              <>
                <li>
                  {user ? (
                    <Link to="/profile">
                      <img src={user.avatar} alt='user image' className="w-[50px] h-[50px] rounded-full" />
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