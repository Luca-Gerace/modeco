import './ProductSlider.css'
import { useState, useEffect } from 'react';
import { getProducts } from '../../../services/api';
import ProductCard from '../ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import SkeletonProductCard from '../../Skeleton/SkeletonProductCard';

export default function ProductSlider({ filteredCategory, bgColor, title, altColor, subtitle, textColor, link, anchor }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const filteredProducts = data.filter(product => product.category === filteredCategory);
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filteredCategory]);

  return (
    <section className={`w-full -mt-8 py-6 lg:py-8 flex flex-col gap-8 ${bgColor} relative overflow-hidden`}>
      <h2 className={`text-[26px] md:text-[34px] font-bold leading-8 md:leading-[40px] px-4 lg:px-6 ${textColor} relative`}>
        {title} <span className={altColor}>{subtitle}</span>
      </h2>
      <div className="flex flex-wrap gap-6 ml-4 mr-0 lg:mx-0 z-20">
        <div className="hidden md:flex md:overflow-hidden md:gap-6 pb-6 px-6 w-full">
          {loading ? (
            <>
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
            </>
          ) : (
            products
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product._id} product={product} textColor={textColor} altColor={altColor} />
              ))
          )}
        </div>
        <div className="flex md:hidden w-full overflow-x-auto gap-6 scrollbar-hide pb-12">
          {loading ? (
            <>
              <div className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 last:mr-4">
                <SkeletonProductCard />
              </div>
              <div className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 last:mr-4">
                <SkeletonProductCard />
              </div>
              <div className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 last:mr-4">
                <SkeletonProductCard />
              </div>
              <div className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 last:mr-4">
                <SkeletonProductCard />
              </div>
            </>
          ) : (
            products
              .slice(0, 4)
              .map((product) => (
                <div key={product._id} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 last:mr-4">
                  <ProductCard product={product} textColor={textColor} altColor={altColor} />
                </div>
              ))
          )}
        </div>
      </div>
      <Link 
          to={`${link}`} 
          className='-mt-8 md:mt-0 px-4 md:px-6 pb-2 flex gap-2 items-center flex-end text-white font-bold hover:underline justify-end z-20'
          >
          <span>{anchor}</span> <ArrowRightIcon className='w-6' />
      </Link>
      <div className='sliderShape z-10'></div>
    </section>
  );
}
