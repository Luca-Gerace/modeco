import ProductsFilter from '../../components/Product/ProductsFilter'; 
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../services/api';
import ProductCard from '../../components/Product/ProductCard';
import { Input, Select, Option, Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SkeletonProductCard from '../../components/Skeleton/SkeletonProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);
  
        let filteredProducts = data;
  
        const category = searchParams.get('category');
        const type = searchParams.get('type');
        const price = searchParams.get('price');
  
        if (category) {
          filteredProducts = filteredProducts.filter(product => product.category === category);
        }
  
        if (type) {
          const typesArray = decodeURIComponent(type).split(',');
          console.log('Types Array:', typesArray); // Debug
          filteredProducts = filteredProducts.filter(product => typesArray.includes(product.type));
        }

        if (price) {
          filteredProducts = filteredProducts.filter(product => product.price <= price);
        }
  
        setProducts(filteredProducts);
        console.log('Filtered Products:', filteredProducts); // Debug
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [searchParams]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e);
  };

  const applyFilters = (newFilters) => {
    const params = {};
    if (newFilters.category) {
      params.category = newFilters.category;
    }
    if (newFilters.price) {
      params.price = newFilters.price;
    }
    if (newFilters.type.length > 0) {
      params.type = encodeURIComponent(newFilters.type.join(','));
    }

    setSearchParams(params);
    setFilterModalOpen(false);
  };

  const handleOpenFilterModal = () => setFilterModalOpen(!filterModalOpen);

  return (
    <div className="container mx-auto px-4">
      <div className='flex w-full flex-col md:flex-row gap-4 items-center justify-between mt-2 mb-8'>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="w-full md:w-72">
            <Input
              label="Cerca un prodotto"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full md:w-72">
            <Select
              label="Ordina per prezzo"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <Option value="">Nessun ordinamento</Option>
              <Option value="lowToHigh">dal più basso al più alto</Option>
              <Option value="highToLow">dal più alto al più basso</Option>
            </Select>
          </div>
          <Button onClick={handleOpenFilterModal} className="md:w-auto w-full">
            Filtra
          </Button>
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
      
      <ProductsFilter 
        open={filterModalOpen} 
        handleOpen={handleOpenFilterModal} 
        applyFilters={applyFilters}
        allProducts={allProducts} 
      />
    </div>
  );
}
