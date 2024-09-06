import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/Product/ProductCard';
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SkeletonProductCard from '../components/Skeleton/SkeletonProductCard';

const TITLES = {
  clothes: 'Abbigliamento',
  'food-and-beverage': 'Cibo e bevande',
  'second-hand': 'Abbigliamento usato',
  cosmetics: 'Cosmetici'
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const category = searchParams.get('category');
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);

        let filteredProducts = data;

        // Applicare il filtro per categoria e tipo
        if (category) {
          filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        if (type) {
          filteredProducts = filteredProducts.filter(product => product.type === type);
        }

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, type]);

  useEffect(() => {
    // Filtra i prodotti in base al termine di ricerca
    const filteredProducts = allProducts.filter(product => {
      const matchesCategory = !category || product.category === category;
      const matchesType = !type || product.type === type;
      const matchesSearchTerm = (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.brand?.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesType && matchesSearchTerm;
    });

    setProducts(filteredProducts);
  }, [searchTerm, category, type, allProducts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const pageTitle = category && TITLES[category] ? TITLES[category] : 'Tutti i prodotti';

  return (
    <div className="container mx-auto px-4">
      <div className='flex w-full flex-col md:flex-row gap-4 items-center justify-between mt-2 mb-8'>
        <h1 className="text-2xl font-bold">
          {pageTitle}
        </h1>
        <div className="w-full md:w-72">
          <Input
            label="Cerca un prodotto"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {
          loading ? (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product._id} product={product} textColor="text-black" altColor="text-[#96A7AF]" />
                ))
              ) : (
                <div className="flex flex-col items-center gap-6 py-12 h-[500px]">
                  <h2 className="font-bold text-center">Nessun prodotto trovato.</h2>
                </div>
              )}
            </>
          )
        }
      </div>
    </div>
  );
}
