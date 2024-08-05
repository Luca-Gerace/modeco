import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { updateWishlist } from '../services/api';

export default function ProductCard({ product, isInWishlist = false }) {
  const [inWishlist, setInWishlist] = useState(isInWishlist);

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
    <Link to={`/product/${product._id}`} className="block relative">
      <div className="max-w-sm overflow-hidden">
        <div className="w-full h-[250px] bg-[#EDF1FA] rounded-xl relative">
          <img className="w-full relative top-4" src={product.image} alt={product.name} />
          <button 
            onClick={handleWishlist}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          >
            <HeartIcon 
              className={`h-5 w-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
            />
          </button>
        </div>
        <div className="py-4">
          <p className="text-c mb-2">{product.brand}</p>
          <h3 className="font-bold text-base mb-2 text-[#96A7AF]">{product.name}</h3>
          <p className="font-bold">{product.price.toFixed(2)} €</p>
        </div>
      </div>
    </Link>
  );
}