import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, addToCart, getProducts } from "../services/api";
import Alert from '../components/Alert';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Button, Input, Select } from "@material-tailwind/react";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import Badge from "../components/Badge";
import ProductCard from "../components/Product/ProductCard";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const clothesProducts = data.filter(product => product.category === 'clothes');
        setProducts(clothesProducts);
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async () => {
    try {
      await addToCart(id, quantity);
      setAlert({ message: "Prodotto aggiunto al carrello!", type: "success" });
    } catch (error) {
      console.error('Errore nell\'aggiunta al carrello:', error);
      setAlert({ message: "Errore nell'aggiunta al carrello. Riprova.", type: "error" });
    }
  }

  const handleBack = () => {
    navigate(-1);
  };

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
          </div>
          <div className="md:w-1/2 flex flex-col gap-8">
            <div className="mb-4">
              <p className="text-xl mb-2">{product.brand?.name}</p>
              <h1 className="font-bold text-3xl mb-2 text-[#96A7AF]">{product.name}</h1>
              <p className="text-2xl font-bold mb-4">€{product.price?.toFixed(2)}</p>
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
            <div className="mb-4">
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
            <Button onClick={handleAddToCart} className="flex items-center justify-center gap-4 w-full bg-[#000] text-white py-4 rounded-full capitalize text-[16px] mb-6" color="black" disabled={quantity === 0 || product.quantity === 0}>
              {product.quantity === 0 ? "Prodotto esaurito" : `Aggiungi al carrello`} {product.quantity > 0 && <PlusIcon className="h-5 w-5" />}
            </Button>
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
                <li key={license._id} className="flex gap-3 items-center pb-3 last:pb-0">
                  <img src={license.image} className="w-12 h-12 rounded-full border border-green-500" />
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[18px]">{license.name}</h3>
                    <p>{license.description}</p>
                  </div>
                </li>
              ))}
              </ul>
          </div>
        )}
        <div className="flex flex-col gap-4 pb-16">
            <h2 className="text-[20px] font-bold pb-4 border-b">Potrebbe interessarti</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-2">
              {products
                .filter((relatedProduct) => relatedProduct._id !== product._id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
        </div>
      </div>
    </>
  );
}