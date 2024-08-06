import { useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  Card,
  Badge,
} from "@material-tailwind/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { getCart } from '../../services/api';
import CartItem from "./CartItem";
export function SidebarCart() {

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    if (isDrawerOpen) {
      fetchCartData();
    }
  }, [isDrawerOpen]);

  const fetchCartData = async () => {
    try {
      const cartData = await getCart();
      setCartItems(cartData.items);
      setTotalPrice(cartData.totalPrice);
      console.log(cartData);
    } catch (error) {
      console.error('Errore nel recupero dei dati del carrello:', error);
      setCartItems([]);
      setTotalPrice(0);
    }
  };


  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        <ShoppingBagIcon className="h-8 w-8 stroke-2" />
      </IconButton>
      {
        cartItems.length > 1&& (
          <Badge overlap="circular" className="absolute -mt-8" color="red" content={cartItems.length}>
            {' '}
          </Badge>
        )
      }
      <Drawer open={isDrawerOpen} onClose={closeDrawer} placement="right">
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Typography variant="h5" color="blue-gray">
              Carrello
            </Typography>
          </div>
          <List className="overflow-y-auto max-h-[calc(100vh-6rem)]">
            {cartItems.map(item => (
              <CartItem key={item._id} item={item} fetchCartData={fetchCartData} />
            ))}
          </List>
          <div className="mt-auto">
            <Typography variant="h6" color="blue-gray" className="mx-auto mb-2">
              Totale: €{totalPrice}
            </Typography>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md">
              Procedi al checkout
            </button>
          </div>
        </Card>
      </Drawer>
    </>
  );
}