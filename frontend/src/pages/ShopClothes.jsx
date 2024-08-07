import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/Product/ProductCard';

export default function ShopClothes() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Abbigliamento</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}