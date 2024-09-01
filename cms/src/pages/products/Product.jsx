import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../services/api";
import EditProductModal from "../../components/Product/EditProductModal";
import EditProductImageModal from "../../components/Product/EditProductImageModal";
import DeleteProductModal from "../../components/Product/DeleteProductModal";
import { PencilIcon, TrashIcon, PhotoIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  
  // Modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(!openEditModal);
  const handleImageModalOpen = () => setOpenImageModal(!openImageModal);
  const handleDeleteModalOpen = () => setOpenDeleteModal(!openDeleteModal);

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleBack} className="flex items-center gap-3 mb-4 px-4">
        <ArrowLeftIcon className="h-5 w-5" /> Go back
      </button>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8 pb-8">
          <div className="w-full md:w-1/2 bg-[#EDF1FA] rounded-xl relative mb-6 md:mb-0">
            <Button onClick={handleImageModalOpen} className="bg-gray-900 p-4 rounded-full !absolute top-4 left-4 z-10">
              <PhotoIcon strokeWidth={2} className="h-6 w-6" />
            </Button>
            <img className="w-full relative top-4" src={product.image} alt={product.name} />
          </div>
          <div className="md:w-1/2 flex flex-col gap-8">
            <div>
              <p className="text-xl mb-2">{product.brand?.name}</p>
              <h1 className="font-bold text-3xl mb-2 text-[#96A7AF]">{product.type}</h1>
              <p className="text-2xl font-bold mb-4">€{product.price?.toFixed(2)}</p>
              <h4 className="font-bold">Quantity:</h4>
              <p className="mb-4">{product.quantity}</p>
              {(product.category === 'clothes' || product.category === 'second hand') && (
                <>
                  <h4 className="font-bold">Color:</h4>
                  <p className="mb-4">{product.color}</p>
                  <h4 className="font-bold">Available Sizes:</h4>
                  <ul className="list-disc flex gap-2">
                    {product.size?.map((sizeOption) => (
                      <li key={sizeOption} className="flex justify-between items-center bg-[#333] rounded-full px-4 py-1 my-1">
                        <span className="font-bold text-white">{sizeOption}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {product.licenses && product.licenses.length > 0 && (
                <>
                  <h4 className="mt-4 font-bold">Licenses:</h4>
                  <ul className="list-disc flex gap-2">
                    {product.licenses.map((license) => (
                      <li key={license._id} className="flex justify-between items-center bg-green-500 rounded-full px-4 py-1 my-1">
                        <span className="font-bold text-white">{license.name}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-24">
          <h4 className="text-[24px] pb-4 border-b">Description</h4>
          <h3 className="text-black font-bold pt-2">{product.name}</h3>
          <p className="text-black">{product.description}</p>
        </div>
        <div className="w-screen p-6 bg-white fixed bottom-0 left-0 border-t-2 shadow-2xl">
          <div className="w-full lg:w-[1024px] m-auto px-0 md:px-4 flex justify-between items-center">
            <Button onClick={handleEditModalOpen} className="flex items-center px-4 gap-2 rounded-full">
              <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit Product
            </Button>
            <Button onClick={handleDeleteModalOpen} className="bg-red-500 flex items-center px-4 gap-2 rounded-full">
              <TrashIcon strokeWidth={2} className="h-4 w-4" /> Delete Product
            </Button>
          </div>
        </div>
      </div>
      <EditProductModal open={openEditModal} handleOpen={handleEditModalOpen} productData={product} setProduct={setProduct} />
      <EditProductImageModal open={openImageModal} handleOpen={handleImageModalOpen} productId={id} product={product} setProduct={setProduct} />
      <DeleteProductModal open={openDeleteModal} handleOpen={handleDeleteModalOpen} productId={id} navigate={navigate} />
    </>
  );
}