import { useState, useEffect } from 'react';
import { getCart } from '../services/api';
import { Button, Typography, Input } from '@material-tailwind/react';
import CartItem from '../components/Cart/CartItem';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await getCart();
      setCartItems(cartData.items);
      setTotalPrice(cartData.totalPrice);
    };

    fetchCartData();
  }, []);

  const handleConfirmOrder = () => {
    // TODO: remove this
    console.log('Ordine confermato:', { shippingAddress, paymentInfo });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Riepilogo Prodotti</h2>
        <ul>
          {cartItems.map(item => (
            <CartItem key={item._id} item={item} fetchCartData={() => {}} />
          ))}
        </ul>
        <Typography variant="h6" color="blue-gray" className="mt-4">
          Totale: €{totalPrice.toFixed(2)}
        </Typography>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Dati di Spedizione</h2>
        <Input
          label="Indirizzo di Spedizione"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="mb-4"
        />
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Dati di Pagamento</h2>
        <Input
          label="Informazioni di Pagamento"
          value={paymentInfo}
          onChange={(e) => setPaymentInfo(e.target.value)}
          className="mb-4"
        />
      </div>
      <Button onClick={handleConfirmOrder} className="w-full bg-[#000] text-white py-4 rounded-full capitalize text-[16px]">
        Conferma Ordine
      </Button>
    </div>
  );
}