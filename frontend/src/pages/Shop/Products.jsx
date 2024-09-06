import ProductsFilter from '../../components/Product/ProductsFilter'; 
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../services/api';
import ProductCard from '../../components/Product/ProductCard';
import { Input, Select, Option, Button } from "@material-tailwind/react";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SkeletonProductCard from '../../components/Skeleton/SkeletonProductCard';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);

        if (data.length > 0) {
          const prices = data.map(product => product.price);
          setMinPrice(Math.ceil(Math.min(...prices)));
          setMaxPrice(Math.ceil(Math.max(...prices)));
        }

        let filteredProducts = data;

        const category = searchParams.get('category');
        const type = searchParams.get('type');
        const price = searchParams.get('price');

        if (category) {
          filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        if (type) {
          const typesArray = decodeURIComponent(type).split(',');
          filteredProducts = filteredProducts.filter(product => typesArray.includes(product.type));
        }

        if (price) {
          filteredProducts = filteredProducts.filter(product => product.price <= price);
        }

        // Filtraggio per termine di ricerca
        if (searchTerm) {
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        }        

        // Ordinamento dei prodotti
        if (sortOrder === "lowToHigh") {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "highToLow") {
          filteredProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, searchTerm, sortOrder]);

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

  const clearFilters = () => {
    setSearchParams({});
  };

  const handleOpenFilterModal = () => setFilterModalOpen(!filterModalOpen);

  const getFilterCount = () => {
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const price = searchParams.get('price');
    let count = 0;

    if (category) count += 1;
    if (type) count += decodeURIComponent(type).split(',').length;
    if (price) count += 1;

    return count;
  };

  return (
    <div className="container mx-auto px-4">
      <div className='flex w-full flex-col md:flex-row gap-4 items-center justify-between mt-2 mb-8'>
        <div className="flex w-full items-center justify-between">
          <div className='flex gap-4 items-center justify-between md:justify-normal w-full'>
            <div className="w-full md:w-60">
              <Input
                label="Cerca un prodotto"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="w-full md:w-60">
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
          </div>
          <div className="fixed md:relative bottom-8 right-8 md:bottom-0 md:right-0 z-10">
            <Button onClick={handleOpenFilterModal} className="bg-black flex gap-2 items-center rounded-full h-16 w-16 md:w-auto md:h-auto shadow-md md:shadow-none">
              <AdjustmentsHorizontalIcon className='w-12 h-12 md:w-4 md:h-4' /> <span className='hidden md:block'>Filtra</span>
            </Button>
            {getFilterCount() > 0 && (
              <button
                onClick={clearFilters}
                className="flex gap-1 items-center absolute -top-4 -right-4 md:-top-2 md:-right-8 px-2 bg-red-500 rounded-full text-white border-2 border-white"
              >
                {getFilterCount()} <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
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
        currentFilters={{
          category: searchParams.get('category') || "",
          type: (searchParams.get('type') ? decodeURIComponent(searchParams.get('type')).split(',') : []),
          price: searchParams.get('price') || minPrice
        }}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
}