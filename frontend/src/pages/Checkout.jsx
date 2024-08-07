import { useState, useEffect } from 'react';
import { getUserData ,getCart, createOrder, updateProduct, updateCartItem, getProduct } from '../services/api';
import { Button, Typography, Input } from '@material-tailwind/react';
import CartItem from '../components/Cart/CartItem';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function Checkout() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [open, setOpen] = useState(0);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = await getUserData();
      setUser(currentUser);
    };
    fetchUserData();

    const fetchCartData = async () => {
      const cartData = await getCart();
      setCartItems(cartData.items);
      setTotalPrice(cartData.totalPrice);
    };
    fetchCartData();
  }, []);

  const handleConfirmOrder = async () => {
    const orderData = {
      userId: user._id,
      items: cartItems.map(item => ({
        productId: item.productId._id,
        quantity: parseInt(item.quantity),
        price: item.productId.price,
      })),
      totalPrice,
      shippingCost: totalPrice < 100 ? 9 : 0,
      totalQuantity: cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0,
      shippingAddress,
      paymentMethod: paymentInfo,
    };

    console.log('Dati dell\'ordine:', orderData);

    try {
      const response = await createOrder(orderData);
      console.log('Ordine confermato:', response);

      // Aggiorna le quantità dei prodotti acquistati
      await Promise.all(cartItems.map(async (item) => {
        const productDetails = await getProduct(item.productId._id);
        const currentQuantity = productDetails.quantity;
        const quantityToDeduct = parseInt(item.quantity);
        const newQuantity = currentQuantity - quantityToDeduct;

        if (newQuantity < 0) {
          console.error(`Quantità non valida per il prodotto ${item.productId._id}`);
          throw new Error('Quantità non valida');
        }

        console.log(`Aggiornando prodotto ${item.productId._id} con nuova quantità: ${newQuantity}`);
        await updateProduct(item.productId._id, { quantity: newQuantity });
      }));

      // Svuota il carrello
      const cart = await getCart();
      if (cart) {
        console.log(`Svuotando il carrello con ID: ${cart._id}`);
        await updateCartItem(cart._id, [], 0);
      } else {
        console.log('Nessun articolo nel carrello da svuotare.');
      }

      // Go to thank you page
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);

      // Show success alert
      setAlert({ message: 'Ordine confermato con successo!', type: 'success' });
      
    } catch (error) {
      console.error('Errore nella creazione dell\'ordine:', error.response ? error.response.data : error);
      setAlert({ message: 'Errore nella creazione dell\'ordine. Riprovare.', type: 'error' });
    } 
  };

  return (
    <>
      <Accordion open={true} icon={<Icon id={1} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>Riepilogo prodotti</AccordionHeader>
        <AccordionBody>
          <ul>
            {cartItems.map(item => (
              <CartItem key={item._id} item={item} fetchCartData={() => {}} />
            ))}
          </ul>
          <Typography variant="h6" color="blue-gray" className="mt-4">
            Totale: €{totalPrice.toFixed(2)}
          </Typography>
        </AccordionBody>
      </Accordion>
      <Accordion open={true} icon={<Icon id={2} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Dati di spedizione
        </AccordionHeader>
        <AccordionBody>
          <Input
            label="Indirizzo di Spedizione"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="mb-4"
            required
          />
        </AccordionBody>
      </Accordion>
      <Accordion open={true} icon={<Icon id={3} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Dati di pagamento
        </AccordionHeader>
        <AccordionBody>
          <Input
            label="Informazioni di Pagamento"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
            className="mb-4"
            required
          />
        </AccordionBody>
      </Accordion>
      <Button
        onClick={handleConfirmOrder}
        className="w-full bg-[#000] text-white py-4 rounded-full capitalize text-[16px]"
        disabled={!shippingAddress || !paymentInfo}
      >
        Conferma Ordine
      </Button>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </>
  );
}