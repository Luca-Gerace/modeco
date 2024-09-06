import { Link } from 'react-router-dom';
import Badge from '../Badge';

export default function ProductCard({ product, textColor, altColor }) {

  if (!product) {    
    return null;
  }

  return (
    <Link to={`/products/${product._id}`} className="block relative">
      <div className="max-w-sm overflow-hidden">
        <div className="w-full py-4 bg-[#EDF1FA] rounded-xl relative">
          <img className="w-full relative" src={product.image} alt={product.name} />
            {product.quantity <= 0 && (
              <Badge color="gray">Esaurito</Badge>
            )}
        </div>
        <div className={`py-4 ${textColor}`}>
          <p className="text-c mb-2">{product.brand.name}</p>
          <h3 className={`font-bold text-base mb-2 min-h-12 ${altColor}`}>
            {product.name.length > 40 ? `${product.name.slice(0, 40)}...` : product.name}
          </h3>
          <p className="font-bold">{product.price.toFixed(2)} €</p>
        </div>
      </div>
    </Link>
  );
}