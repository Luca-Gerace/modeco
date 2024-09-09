import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProduct, addToCart } from "../services/api";
import { useUser } from "../modules/UserContext";
import Alert from '../components/Alert';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Button, Input } from "@material-tailwind/react";
import Badge from "../components/Badge";
import RelatedProducts from "../components/Product/RelatedProducts";

export default function Product({ setCartCount }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Errore nel recupero del prodotto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if ((product.category === 'clothes' || product.category === 'second_hand') && !size) {
      setSizeError(true);
      return; 
    }
  
    try {
      await addToCart(id, quantity);
      setAlert({ message: "Prodotto aggiunto al carrello!", type: "success" });
      setSizeError(false);
      setCartCount(prevCount => prevCount + quantity);
    } catch (error) {
      console.error('Errore nell\'aggiunta al carrello:', error);
      setAlert({ message: "Errore nell'aggiunta al carrello. Riprova.", type: "error" });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value, 10);
    
    if (isNaN(value) || value < 1) {
      value = 1; // Imposta il valore minimo a 1
    } else if (value > 20) {
      value = 20; // Limita a 20
    } else if (value > product.quantity) {
      value = product.quantity; // Limita alla quantità disponibile
    }
    
    setQuantity(value);
  }

  return (
    <>
      <button onClick={handleBack} className="flex items-center gap-3 px-4">
        <ArrowLeftIcon className="h-5 w-5" /> Torna indietro
      </button>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8 pb-8">
          <div className="w-full md:w-1/2 bg-[#EDF1FA] rounded-xl relative mb-6 md:mb-0">
            <img className="w-full relative top-4" src={product.image} alt={product.name} />
            {product.quantity <= 0 && (
                <Badge color="gray">Esaurito</Badge>
            )}
            {product.onSale && (
              <Badge color="pink">Saldo {product.discount}%</Badge>
            )}
          </div>
          <div className="md:w-1/2 flex flex-col gap-8">
            <div className="mb-4">
              <p className="text-xl mb-2">{product.brand?.name}</p>
              <h1 className="font-bold text-3xl mb-2 text-[#96A7AF]">{product.name}</h1>
              {product.onSale ? (
                <p className="mb-4 text-2xl">
                  <span className='line-through'>{product.price.toFixed(2)}€</span> <strong>{product.discountedPrice.toFixed(2)}€</strong>
                </p>
              ) : (
                <p className="text-2xl font-bold mb-4">€{product.price?.toFixed(2)}</p>
              )}
            </div>
            {(product.category === 'clothes' || product.category === 'second_hand') && (
              <div>
                <label htmlFor="size" className="block text-base font-medium mb-2">Taglia</label>
                <select 
                  value={size}
                  required 
                  onChange={(e) => {
                    setSize(e.target.value);
                    if (sizeError) setSizeError(false); // Ripristina l'errore quando viene selezionata una taglia
                  }} 
                  className="peer w-full h-12 bg-transparent text-blue-gray-700 transition-all border focus:border-2 placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-gray-900  focus:border-t-[#333]"
                >
                  <option value="" disabled>Seleziona una taglia</option>
                  {product.size.map((sizeOption) => (
                    <option key={sizeOption} value={sizeOption}>
                      {sizeOption}
                    </option>
                  ))}
                </select>
                {sizeError && <p className="text-red-500 text-sm mt-1">Seleziona una taglia per aggiungere il prodotto al carrello</p>}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-base font-medium mb-2">Quantità</label>
              <Input 
                labelProps={{
                  className: "hidden",
                }} 
                type="number" 
                value={quantity} 
                onChange={handleQuantityChange}
                min="1"
                max="100"
                className="w-full outline-1 focus:border-t-[#333]" 
              />
            </div>
            {
              user ? (
                <Button onClick={handleAddToCart} className="flex items-center justify-center gap-4 w-full bg-[#000] text-white py-4 rounded-full capitalize text-[16px] mb-6" color="black" disabled={quantity === 0 || product.quantity === 0}>
                  {product.quantity === 0 ? "Prodotto esaurito" : `Aggiungi al carrello`} {product.quantity > 0 && <PlusIcon className="h-5 w-5" />}
                </Button>
              ) : (
                <Link to='/login'>
                  <Button className="flex items-center justify-center gap-4 w-full bg-[#000] text-white py-4 rounded-full capitalize text-[16px] mb-6" color="black" disabled={quantity === 0 || product.quantity === 0}>
                    Effettua la login per procedere
                  </Button>
                </Link>
              )
            }
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8 pb-16">
            <h2 className="text-[20px] font-bold pb-4 border-b">Descrizione</h2>
            <p className="text-black">{product.description}</p>
        </div>
        { product.licenses && product.licenses.length > 0 && (
          <div className="flex flex-col gap-4 pb-16">
              <h2 className="text-[20px] font-bold pb-4 border-b">Cerfificati di produzione sostenibile</h2>
              <ul>
                {product.licenses.map((license) => (
                  <li key={license._id} className="flex gap-3 items-start pb-6 last:pb-0">
                    <img src={license.image} className="w-12 h-12 rounded-full border border-green-500" />
                    <div className="flex flex-col">
                      <h3 className="font-bold text-[18px] pb-2">{license.name}</h3>
                      <p>{license.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
          </div>
        )}
        <RelatedProducts product={product} />
      </div>
    </>
  );
}
