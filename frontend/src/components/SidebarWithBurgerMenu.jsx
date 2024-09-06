import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  NewspaperIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../modules/UserContext";
 
export function SidebarWithBurgerMenu() {
  const { user, logout } = useUser();

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLinkClick = () => {
    closeDrawer();
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
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Shop
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/products" onClick={handleLinkClick}>
                    <ListItem>
                      Tutti i prodotti
                    </ListItem>
                  </Link>
                  <Link to="/clothes" onClick={handleLinkClick}>
                    <ListItem>
                      Abbigliamento
                    </ListItem>
                  </Link>
                  <Link to="/food-and-beverage" onClick={handleLinkClick}>
                    <ListItem>
                      Cibo e Bevande
                    </ListItem>
                  </Link>
                  <Link to="/cosmetics" onClick={handleLinkClick}>
                    <ListItem>
                      Cosmetici
                    </ListItem>
                  </Link>
                  <Link to="/second-hand" onClick={handleLinkClick}>
                    <ListItem>
                      Second hand
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Link to="/posts" onClick={handleLinkClick}>
              <ListItem>
                <ListItemPrefix>
                  <NewspaperIcon className="h-5 w-5" />
                </ListItemPrefix>
                Blog posts
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
            {user ? (
              <>
                <hr className="my-4" />
                <Link to="/profile" onClick={handleLinkClick}>
                  <ListItem>
                    <ListItemPrefix>
                      <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Profile
                  </ListItem>
                </Link>
                <a onClick={() => { logout(); handleLinkClick(); }}>
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