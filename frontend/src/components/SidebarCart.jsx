import { useState, useEffect } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Card,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getCart, updateCartItem, removeFromCart } from '../services/api';

export function SidebarCart({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchCartData();
    }
  }, [isOpen]);

  const fetchCartData = async () => {
    try {
      const cartData = await getCart();
      setCartItems(cartData.items);
      setTotalPrice(cartData.items.reduce((total, item) => total + (item.price * item.quantity), 0));
    } catch (error) {
      console.error('Errore nel recupero dei dati del carrello:', error);
      setCartItems([]);
      setTotalPrice(0);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity);
      fetchCartData();
    } catch (error) {
      console.error('Errore nell\'aggiornamento della quantità:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      fetchCartData(); // Aggiorna i dati del carrello
    } catch (error) {
      console.error('Errore nella rimozione dell\'articolo:', error);
    }
  };

  const renderCartItem = (item) => (
    <ListItem key={item._id}>
      <ListItemPrefix>
        <img
          src={item.image}
          alt={item.name}
          className="h-12 w-12 rounded-full object-cover"
        />
      </ListItemPrefix>
      <div>
        <Typography variant="h6" color="blue-gray">
          {item.name}
        </Typography>
        <div className="flex items-center gap-2">
          <button onClick={() => handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}>-</button>
          <Typography variant="small" color="gray" className="font-normal">
            Quantità: {item.quantity}
          </Typography>
          <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
        </div>
      </div>
      <ListItemSuffix>
        <Typography variant="h6" color="blue-gray">
          €{(item.price * item.quantity).toFixed(2)}
        </Typography>
        <IconButton variant="text" color="red" onClick={() => handleRemoveItem(item._id)}>
          <XMarkIcon className="h-4 w-4" />
        </IconButton>
      </ListItemSuffix>
    </ListItem>
  );

  return (
    <Drawer open={isOpen} onClose={onClose} placement="right">
      <Card
        color="transparent"
        shadow={false}
        className="h-[calc(100vh-2rem)] w-full p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Carrello
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={onClose}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <List>
          {cartItems.map(renderCartItem)}
        </List>
        <div className="mt-auto">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Totale: €{totalPrice.toFixed(2)}
          </Typography>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            Procedi al checkout
          </button>
        </div>
      </Card>
    </Drawer>
  );
}