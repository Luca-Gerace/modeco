import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import Alert from '../../components/Alert'; 

export default function Product() {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Errore nel recupero del prodotto:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="w-full md:w-1/2 bg-[#EDF1FA] rounded-xl relative mb-6 md:mb-0">
          {/* <img className="w-full relative top-4" src={product.image} alt={product.name} /> */}
        </div>
        <div className="md:w-1/2 flex flex-col gap-8">
          <div>
            {/* <p className="text-xl mb-2">{product.brand}</p>
            <h1 className="font-bold text-3xl mb-2 text-[#96A7AF]">{product.name}</h1>
            <p className="text-2xl font-bold mb-4">€{product.price?.toFixed(2)}</p>
            <p className="mb-4">{product.description}</p> */}
          </div>
          {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </div>
      </div>
    </div>
  );
}