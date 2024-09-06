import { useState, useEffect } from 'react';
import { getUserData ,getCart, createOrder, updateProduct, updateCartItem, getProduct } from '../services/api';
import { Button, Typography, Input } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import ProductListItem from '../components/Product/ProductListItem';

export default function Checkout() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = await getUserData();
      setUser(currentUser);
    };
    fetchUserData();
    fetchCartData();
  }, []);

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

    try {
      await createOrder(orderData);

      await Promise.all(cartItems.map(async (item) => {
        const productDetails = await getProduct(item.productId._id);
        const currentQuantity = productDetails.quantity;
        const quantityToDeduct = parseInt(item.quantity);
        const newQuantity = currentQuantity - quantityToDeduct;

        if (newQuantity < 0) {
          console.error(`Quantità non valida per il prodotto ${item.productId._id}`);
          throw new Error('Quantità non valida');
        }

        await updateProduct(item.productId._id, { quantity: newQuantity });
      }));

      // Svuota il carrello
      const cart = await getCart();
      
      if (cart) {
        await updateCartItem(cart._id, [], 0);
      } 

      // Go to thank you page
      setTimeout(() => {
        navigate('/thank-you');
      }, 1500);

      // Show success alert
      setAlert({ message: 'Ordine confermato con successo!', type: 'success' });
      
    } catch (error) {
      console.error('Errore nella creazione dell\'ordine:', error.response ? error.response.data : error);
      setAlert({ message: 'Errore nella creazione dell\'ordine. Riprovare.', type: 'error' });
    } 
  };

  return (
    <div className='w-full md:w-[500px] mx-auto px-4'>
      <div className="flex flex-col gap-4 pt-2 pb-4">
          <h1 className="text-[24px] font-bold pb-4 border-b">Riepilogo ordine</h1>
          <ul>
            {cartItems.map(item => (
              <ProductListItem key={item._id} item={item} fetchCartData={fetchCartData} />
            ))}
          </ul>
          <Typography variant="h5" color="blue-gray" className="mt-4">
            Totale: €{totalPrice.toFixed(2)}
          </Typography>
      </div>
      <div className="flex flex-col gap-2 py-4">
          <h2 className="text-[20px] font-bold py-4 border-t">Dati di spedizione</h2>
          <Input
            label="Indirizzo di Spedizione"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="mb-4"
            required
          />
      </div>
      <div className="flex flex-col gap-2 py-4">
          <h2 className="text-[20px] font-bold py-4 border-t">Dati di pagamento</h2>
          <Input
            label="Informazioni di Pagamento"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
            className="mb-4"
            required
          />
      </div>
      <Button
        onClick={handleConfirmOrder}
        className="w-full bg-[#000] text-white py-4 mt-6 rounded-full capitalize text-[16px]"
        disabled={!shippingAddress || !paymentInfo}
      >
        Conferma Ordine
      </Button>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </div>
  );
}