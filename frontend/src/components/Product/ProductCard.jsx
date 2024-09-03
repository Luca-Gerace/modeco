import { Link } from 'react-router-dom';
import Badge from '../Badge';

export default function ProductCard({ product, textColor, altColor }) {

  if (!product) {    
    return null; // Non renderizzare nulla se il prodotto non esiste
  }

  return (
    <Link to={`/products/${product._id}`} className="block relative">
      <div className="max-w-sm overflow-hidden">
        <div className="w-full h-[250px] bg-[#EDF1FA] rounded-xl relative">
          <img className="w-full relative top-4" src={product.image} alt={product.name} />
            {product.quantity <= 0 && (
              <Badge color="gray">Esaurito</Badge>
            )}
        </div>
        <div className={`py-4 ${textColor}`}>
          <p className="text-c mb-2">{product.brand.name}</p>
          <h3 className={`font-bold text-base mb-2 ${altColor}`}>{product.name}</h3>
          <p className="font-bold">{product.price.toFixed(2)} €</p>
        </div>
      </div>
    </Link>
  );
}