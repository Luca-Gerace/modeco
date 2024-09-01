import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLicense } from "../../services/api";
import { PencilIcon, TrashIcon, PhotoIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import SkeletonPage from "../../components/Skeleton/SkeletonPage";
import EditLicenseModal from "../../components/License/EditLicenseModal";
import EditLicenseImageModal from "../../components/License/EditLicenseImageModal";
import DeleteLicenseModal from "../../components/License/DeleteLicenseModal";

export default function License() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(!openEditModal);
  const handleImageModalOpen = () => setOpenImageModal(!openImageModal);
  const handleDeleteModalOpen = () => setOpenDeleteModal(!openDeleteModal);

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        const data = await getLicense(id);
        setLicense(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero del license:', error);
        setLoading(false);
      }
    };

    fetchLicense();
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
                    <div className="w-full md:w-1/2 relative mb-6 md:mb-0 h-[350px]">
                        <Button onClick={handleImageModalOpen} className="bg-gray-900 p-4 rounded-full !absolute top-4 left-4 z-10">
                            <PhotoIcon strokeWidth={2} className="h-6 w-6" />
                        </Button>
                        <img className="w-full h-[350px] object-contain p-8 border-2 border-green-500 rounded-xl" src={license.image} alt={license.name} />
                    </div>
                    <div className="md:w-1/2 flex flex-col gap-8">
                        <div>
                            <h1 className="font-bold text-3xl mb-4 text-[#96A7AF]">{license.name}</h1>
                            <h4 className="font-bold">Description:</h4>
                            <p className="mb-4">{license.description}</p>
                            <h4 className="font-bold">Website:</h4>
                            <p className="mb-4">{license.website}</p>
                            <h4 className="font-bold">Email:</h4>
                            <p className="mb-4">{license.email}</p>
                        </div>
                    </div>
                </div>
                <div className="w-screen p-6 bg-white fixed bottom-0 left-0 border-t-2 shadow-2xl">
                    <div className="w-full lg:w-[1024px] m-auto px-0 md:px-4 flex justify-between items-center">
                        <Button onClick={handleEditModalOpen} className="flex items-center px-4 gap-2 rounded-full">
                            <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit License
                        </Button>
                        <Button onClick={handleDeleteModalOpen} className="bg-red-500 flex items-center px-4 gap-2 rounded-full">
                            <TrashIcon strokeWidth={2} className="h-4 w-4" /> Delete License
                        </Button>
                    </div>
                </div>    
            </>
        )}
        </div>
        <EditLicenseModal open={openEditModal} handleOpen={handleEditModalOpen} licenseData={license} setLicense={setLicense} />
        <EditLicenseImageModal open={openImageModal} handleOpen={handleImageModalOpen} licenseId={id} license={license} setLicense={setLicense} />
        <DeleteLicenseModal open={openDeleteModal} handleOpen={handleDeleteModalOpen} licenseId={id} navigate={navigate} />
    </>
  );
}