import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, addToCart } from "../services/api";
import Alert from '../components/Alert';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct(id)
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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-2">{product.brand}</p>
          <p className="text-2xl font-bold mb-4">€{product.price?.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          {product.category === 'clothes' && (
            <>
              <p className="mb-2"><span className="font-semibold">Colore:</span> {product.color}</p>
              <p className="mb-4"><span className="font-semibold">Taglia:</span> {product.size}</p>
            </>
          )}
          {product.category === 'cosmetics' && (
            <>
              <p className="mb-2"><span className="font-semibold">Ingredienti:</span> {product.ingredients}</p>
              <p className="mb-4"><span className="font-semibold">Data di scadenza:</span> {new Date(product.expirationDate).toLocaleDateString()}</p>
            </>
          )}
          {product.category === 'food and beverage' && (
            <>
              <p className="mb-2"><span className="font-semibold">Valori nutrizionali:</span> {product.nutritionFacts}</p>
              <p className="mb-4"><span className="font-semibold">Data di scadenza:</span> {new Date(product.expirationDate).toLocaleDateString()}</p>
            </>
          )}
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 px-2 py-1 rounded-md"
            >
              -
            </button>
            <span>{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 px-2 py-1 rounded-md"
            >
              +
            </button>
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Aggiungi al carrello
          </button>
          {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </div>
      </div>
    </div>
  );
}