import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/Product/ProductCard';

const TITLES = {
  clothes: 'Abbigliamento',
  'food-and-beverage': 'Food and Beverage',
  'second-hand': 'Second Hand',
  cosmetics: 'Cosmetici'
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);

        if (category) {
          const filteredProducts = data.filter(product => product.category === category);
          setProducts(filteredProducts.length > 0 ? filteredProducts : data); // Mostra i prodotti filtrati o tutti i prodotti se vuoti
        } else {
          setProducts(data); // Mostra tutti i prodotti se nessuna categoria è specificata
        }
        
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const pageTitle = category && TITLES[category] ? TITLES[category] : 'Tutti i prodotti';

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">
        {pageTitle}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} textColor="text-black" altColor="text-[#96A7AF]" />
          ))
        ) : (
          // Mostra tutti i prodotti se nessun prodotto corrisponde al filtro
          allProducts.map(product => (
            <ProductCard key={product._id} product={product} textColor="text-black" altColor="text-[#96A7AF]" />
          ))
        )}
      </div>
    </div>
  );
}
