import {
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeFromCart, updateCartItem, getCart } from "../../services/api";

export default function CartItem({ item, fetchCartData }) {

  const handleUpdateQuantity = async (newQuantity) => {
    try {
      const cart = await getCart(); 
      const updatedItems = cart.items.map(cartItem =>
        cartItem.productId._id === item.productId._id ? { ...cartItem, quantity: newQuantity } : cartItem
      );
      const updatedTotalPrice = updatedItems.reduce((total, cartItem) => total + (cartItem.productId.price * cartItem.quantity), 0);

      await updateCartItem(cart._id, updatedItems, updatedTotalPrice);
      fetchCartData(); 
    } catch (error) {
      console.error('Errore nell\'aggiornamento della quantità:', error);
    }
};
    
  const handleRemoveItem = async () => {
    try {
      await removeFromCart(item.productId._id);
      fetchCartData();
    } catch (error) {
      console.error('Errore nella rimozione dell\'articolo:', error);
    }
  };

  return (
    <li key={item._id} className="flex justify-between items-center border-b border-gray-300 py-4 last:border-b-0">
      <div className="flex items-center gap-4">
        <img
          src={item.productId.image}
          alt={item.productId.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <Typography variant="h6" color="blue-gray" className="text-[12px]">
            {item.productId.name} 
          </Typography>
          <div className="flex items-center gap-2">
            <button onClick={() => handleUpdateQuantity(Math.max(1, item.quantity - 1))}>-</button>
            <Typography variant="small" color="gray" className="font-normal">
              Quantità: {item.quantity}
            </Typography>
            <button onClick={() => handleUpdateQuantity(item.quantity + 1)}>+</button>
          </div>
          <Typography variant="h6" color="blue-gray">
            €{(item.productId.price * item.quantity).toFixed(2)} 
          </Typography>
        </div>
      </div>
        <div>
          <IconButton variant="text" color="red" onClick={handleRemoveItem}>
            <XMarkIcon className="h-4 w-4" />
          </IconButton>
        </div>
    </li>
  );
}