import { useState, useEffect } from 'react';
import { getCart } from '../services/api';
import { Button, Typography, Input } from '@material-tailwind/react';
import CartItem from '../components/Cart/CartItem';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
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
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

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
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
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
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Dati di spedizione
        </AccordionHeader>
        <AccordionBody>
          <Input
            label="Indirizzo di Spedizione"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="mb-4"
          />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Dati di pagamento
        </AccordionHeader>
        <AccordionBody>
          <Input
            label="Informazioni di Pagamento"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
            className="mb-4"
          />
        </AccordionBody>
      </Accordion>
      <Button onClick={handleConfirmOrder} className="w-full bg-[#000] text-white py-4 rounded-full capitalize text-[16px]">
        Conferma Ordine
      </Button>
    </>
  );
}