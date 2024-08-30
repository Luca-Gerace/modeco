import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/api";
import EditProductModal from "../../components/Product/EditProduct";
import { Button } from "@mui/material";
import { UserPlusIcon } from "@heroicons/react/24/solid";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Errore nel recupero del prodotto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8 pb-24">
          <div className="w-full md:w-1/2 bg-[#EDF1FA] rounded-xl relative mb-6 md:mb-0">
            <img className="w-full relative top-4" src={product.image} alt={product.name} />
          </div>
          <div className="md:w-1/2 flex flex-col gap-8">
            <div>
              <p className="text-xl mb-2">{product.brand}</p>
              <h1 className="font-bold text-3xl mb-2 text-[#96A7AF]">{product.name}</h1>
              <p className="text-2xl font-bold mb-4">€{product.price?.toFixed(2)}</p>
              <h4 className="font-bold">Description:</h4>
              <p className="mb-4">{product.description}</p>
              <h4 className="font-bold">Quantity:</h4>
              <p className="mb-4">{product.quantity}</p>
              {(product.category === 'clothes' || product.category === 'second hand') && (
                <>
                  <h4 className="font-bold">Color:</h4>
                  <p className="mb-4">{product.color}</p>
                  <h4 className="font-bold">Available Sizes:</h4>
                  <ul className="list-disc flex gap-2">
                    {product.size.map((sizeOption) => (
                      <li key={sizeOption} className="flex justify-between items-center bg-[#333] hover:bg-[#242424] rounded-full px-4 py-1 my-1">
                        <span className="font-bold text-white">{sizeOption}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-screen p-6 bg-white fixed bottom-0 left-0 border-t-2 shadow-2xl">
          <Button onClick={handleOpen} className="flex items-center gap-3" size="sm">
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Edit Product
          </Button>
        </div>
      </div>
      <EditProductModal open={open} handleOpen={handleOpen} productData={product} setProduct={setProduct} />
    </>
  );
}