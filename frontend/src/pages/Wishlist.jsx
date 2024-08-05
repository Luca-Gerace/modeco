import { useState, useEffect } from 'react';
import { getWishlist } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        setWishlistItems(data.products);
      } catch (error) {
        console.error('Errore nel recupero della wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">La mia Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>La tua wishlist è vuota.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlistItems.map(product => (
            <ProductCard key={product._id} product={product} isInWishlist={true} />
          ))}
        </div>
      )}
    </div>
  );
}