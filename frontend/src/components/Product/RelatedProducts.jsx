import { useState, useEffect } from 'react';
import { getProducts } from "../../services/api";
import ProductCard from './ProductCard';

export default function RelatedProducts({ product }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const data = await getProducts();
            setProducts(data);
            } catch (error) {
            console.error('Errore nel recupero dei prodotti:', error);
            }
        };

        fetchProducts();
    }, []);


  const relatedProducts = products
    .filter((relatedProduct) =>
      relatedProduct._id !== product._id &&
      relatedProduct.category === product.category &&
      relatedProduct.quantity > 0 
    )
    .slice(0, 4);

  const hasRelatedProducts = relatedProducts.length > 0;

  return (
    hasRelatedProducts && ( 
      <div className="flex flex-col gap-4 pb-16">
        <h2 className="text-[20px] font-bold pb-4 border-b">Potrebbe interessarti anche</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-2">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct._id} product={relatedProduct} textColor="text-black" altColor="text-[#96A7AF]" />
          ))}
        </div>
      </div>
    )
  );
}
