import { useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  Card,
  Button,
} from "@material-tailwind/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { getCart } from '../../services/api';
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
export function SidebarCart() {

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

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
    } catch (error) {
      console.error('Errore nel recupero dei dati del carrello:', error);
      setCartItems([]);
      setTotalPrice(0);
    }
  };

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        <ShoppingBagIcon className="h-8 w-8 stroke-2" />
      </IconButton>
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
          <ul className="overflow-y-auto max-h-[calc(100vh-12rem)]">
            {cartItems.map(item => (
              <CartItem key={item._id} item={item} fetchCartData={fetchCartData} />
            ))}
          </ul>
          <div className="mt-auto pt-6 border-t-2 border-[#23C16B]">
            <div className="flex justify-between items-center">
              <Typography variant="paragraph" color="blue-gray" className="mb-2">
                Spedizione <small className="text-[10px]">(100% ecologica)</small>
              </Typography>
              <Typography variant="paragraph" color="blue-gray" className="mb-2">
                {totalPrice < 100 ? `€9.00` : 'Gratis'}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="h6" color="blue-gray" className="mb-6">
                Totale
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-6">
                €{(totalPrice + (totalPrice < 100 ? 9 : 0)).toFixed(2)}
              </Typography>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full bg-[#23C16B] text-white py-4 rounded-full capitalize text-[16px]" 
              color="green" 
              disabled={cartItems.length === 0}
            >
              Procedi al checkout
            </Button>
          </div>
        </Card>
      </Drawer>
    </>
  );
}