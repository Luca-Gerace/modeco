import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="max-w-sm overflow-hidden">
        <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base mb-2">{product.brand}</p>
          <h3 className="font-bold text-xl mb-2">{product.name}</h3>
          <p className="text-gray-800 font-bold">{product.price.toFixed(2)} €</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;