import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, addToCart } from "../services/api";
import Alert from '../components/Alert';
import { updateWishlist } from '../services/api';
import { HeartIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button, Input, Select } from "@material-tailwind/react";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import Badge from "../components/Badge";

export default function Product({isInWishlist = false}) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [alert, setAlert] = useState(null);
  const [inWishlist, setInWishlist] = useState(isInWishlist);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Errore nel recupero del prodotto:', error);
      }
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(id, quantity);
      setAlert({ message: "Prodotto aggiunto al carrello!", type: "success" });
    } catch (error) {
      console.error('Errore nell\'aggiunta al carrello:', error);
      setAlert({ message: "Errore nell'aggiunta al carrello. Riprova.", type: "error" });
    }
  }

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await updateWishlist(product._id);
      setInWishlist(!inWishlist);
    } catch (error) {
      console.error('Errore nell\'aggiornamento della wishlist:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="w-full md:w-1/2 bg-[#EDF1FA] rounded-xl relative mb-6 md:mb-0">
          <img className="w-full relative top-4" src={product.image} alt={product.name} />
          {product.quantity <= 0 && (
              <Badge color="gray">Esaurito</Badge>
            )}
          <button 
            onClick={handleWishlist}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          >
            <HeartIcon 
              className={`h-5 w-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
            />
          </button>
        </div>
        <div className="md:w-1/2 flex flex-col gap-8">
          <div>
            <p className="text-xl mb-2">{product.brand}</p>
            <h1 className="font-bold text-3xl mb-2 text-[#96A7AF]">{product.name}</h1>
            <p className="text-2xl font-bold mb-4">€{product.price?.toFixed(2)}</p>
            <p className="mb-4">{product.description}</p>
          </div>
          {(product.category === 'clothes' || product.category === 'second hand') && (
            <div>
              <label htmlFor="size" className="block text-base font-medium mb-2">Taglia</label>
              <Select 
                labelProps={{
                  className: "hidden",
                }} 
                value={size} 
                onChange={(e) => setSize(e)}
                className="w-full outline-1 focus:border-t-[#333]" 
              >
                <SelectOption value="" disabled>Seleziona una taglia</SelectOption>
                {product.size.map((sizeOption) => (
                  <SelectOption key={sizeOption} value={sizeOption}>{sizeOption}</SelectOption>
                ))}
              </Select>
            </div>
          )}
          <div>
            <label htmlFor="quantity" className="block text-base font-medium mb-2">Quantità</label>
            <Input 
              labelProps={{
                className: "hidden",
              }} 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              className="w-full outline-1 focus:border-t-[#333]" 
            />
          </div>
          <Button onClick={handleAddToCart} className="flex items-center justify-center gap-4 w-full bg-[#000] text-white py-4 rounded-full capitalize text-[16px]" color="black" disabled={quantity === 0 || product.quantity === 0}>
            {product.quantity === 0 ? "Prodotto esaurito" : `Aggiungi al carrello`} {product.quantity > 0 && <PlusIcon className="h-5 w-5" />}
          </Button>
          {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </div>
      </div>
    </div>
  );
}



function Icon({ id, openAccordion }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === openAccordion ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}


  // Accordion
  const [openAccordion, setOpenAccordion] = useState(0);

  const handleOpenAccordion = (value) => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

<Accordion open={openAccordion === 1} icon={<Icon id={1} openAccordion={openAccordion} />}>
<AccordionHeader onClick={() => handleOpenAccordion(1)}>Description</AccordionHeader>
<AccordionBody>
  <h3>{product.name}</h3>
  <p>{product.description}</p>
</AccordionBody>
</Accordion>