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
import { XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { getCart } from '../services/api';

export function SidebarCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      fetchCartData();
    }
  }, [isOpen]);

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

  const groupItemsByCategory = () => {
    return cartItems.reduce((acc, item) => {
      if (!acc[item.product.category]) {
        acc[item.product.category] = [];
      }
      acc[item.product.category].push(item);
      return acc;
    }, {});
  };

  const renderCategoryItems = (category, items) => (
    <div key={category}>
      <Typography variant="h6" color="blue-gray" className="mb-2">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.product._id}>
            <ListItemPrefix>
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {item.product.name}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Quantità: {item.quantity}
              </Typography>
            </div>
            <ListItemSuffix>
              <Typography variant="h6" color="blue-gray">
                €{(item.product.price * item.quantity).toFixed(2)}
              </Typography>
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const groupedItems = groupItemsByCategory();

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        <ShoppingCartIcon className="h-8 w-8 stroke-2" />
      </IconButton>
      <Drawer placement="right" open={isOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Carrello
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          {Object.entries(groupedItems).map(([category, items]) =>
            renderCategoryItems(category, items)
          )}
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
    </>
  );
}