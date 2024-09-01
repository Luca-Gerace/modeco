import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBrand } from "../../services/api";
import EditProductModal from "../../components/Product/EditProductModal";
import EditProductImageModal from "../../components/Product/EditProductImageModal";
import ConfirmDeleteModal from "../../components/Product/DeleteProductModal";
import { PencilIcon, TrashIcon, PhotoIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import SkeletonPage from "../../components/Skeleton/SkeletonPage";
import EditBrandModal from "../../components/Brand/EditBrandModal";

export default function Brand() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(!openEditModal);
  const handleImageModalOpen = () => setOpenImageModal(!openImageModal);
  const handleDeleteModalOpen = () => setOpenDeleteModal(!openDeleteModal);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrand(id);
        setBrand(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero del brand:', error);
        setLoading(false);
      }
    };

    fetchBrand();
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
        {loading ? (
            <>
                <SkeletonPage />
            </>
        ) : (
            <>
                <div className="flex flex-col md:flex-row md:space-x-8 pb-8">
                    <div className="w-full md:w-1/2 bg-[#EDF1FA] rounded-xl relative mb-6 md:mb-0 h-[350px]">
                        <Button onClick={handleImageModalOpen} className="bg-gray-900 p-4 rounded-full !absolute top-4 left-4 z-10">
                            <PhotoIcon strokeWidth={2} className="h-6 w-6" />
                        </Button>
                        <img className="w-full relative top-4" src={brand.image} alt={brand.name} />
                    </div>
                    <div className="md:w-1/2 flex flex-col gap-8">
                        <div>
                            <h1 className="font-bold text-3xl mb-4 text-[#96A7AF]">{brand.name}</h1>
                            <h4 className="font-bold">Description:</h4>
                            <p className="mb-4">{brand.description}</p>
                            <h4 className="font-bold">Website:</h4>
                            <p className="mb-4">{brand.website}</p>
                            <h4 className="font-bold">Email:</h4>
                            <p className="mb-4">{brand.email}</p>
                        </div>
                    </div>
                </div>
                <div className="w-screen p-6 bg-white fixed bottom-0 left-0 border-t-2 shadow-2xl">
                    <div className="w-full lg:w-[1024px] m-auto px-0 md:px-4 flex justify-between items-center">
                        <Button onClick={handleEditModalOpen} className="flex items-center px-4 gap-2 rounded-full">
                            <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit Brand
                        </Button>
                        <Button onClick={handleDeleteModalOpen} className="bg-red-500 flex items-center px-4 gap-2 rounded-full">
                            <TrashIcon strokeWidth={2} className="h-4 w-4" /> Delete Brand
                        </Button>
                    </div>
                </div>    
            </>
        )}
        </div>
        <EditBrandModal open={openEditModal} handleOpen={handleEditModalOpen} brandData={brand} setBrand={setBrand} />
      {/* 
      <EditProductImageModal open={openImageModal} handleOpen={handleImageModalOpen} brandId={id} brand={brand} setBrand={setBrand} />
      <ConfirmDeleteModal open={openDeleteModal} handleOpen={handleDeleteModalOpen} brandId={id} navigate={navigate} /> */}
    </>
  );
}