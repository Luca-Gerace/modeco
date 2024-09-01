import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../services/api";
import { PencilIcon, TrashIcon, PhotoIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import SkeletonPage from "../../components/Skeleton/SkeletonPage";
import EditPostModal from "../../components/Post/EditPostModal";
import EditPostImageModal from "../../components/Post/EditPostImageModal";
import DeletePostModal from "../../components/Post/DeletePostModal";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(!openEditModal);
  const handleImageModalOpen = () => setOpenImageModal(!openImageModal);
  const handleDeleteModalOpen = () => setOpenDeleteModal(!openDeleteModal);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero del post:', error);
        setLoading(false);
      }
    };

    fetchPost();
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
                <div className="flex flex-col mb-20">
                    <div className="w-full relative mb-6 md:mb-0 h-[350px]">
                        <Button onClick={handleImageModalOpen} className="bg-gray-900 p-4 rounded-full !absolute top-4 left-4 z-10">
                            <PhotoIcon strokeWidth={2} className="h-6 w-6" />
                        </Button>
                        <img className="w-full h-[350px] object-cover rounded-xl" src={post.image} alt={post.title} />
                    </div>
                    <div className="flex flex-col gap-6">
                        <p className="my-4 font-bold">by {post.author.name} {post.author.surname}</p>
                        <h1 className="font-bold text-3xl mb-4 text-[#96A7AF]">{post.title}</h1>
                        <p>{post.content}</p>
                        { post.tags.length > 0 && (
                          <>
                            <hr className="my-2" />
                            <h4 className="font-bold">Tags:</h4>
                            <ul className="list-disc flex gap-2">
                              {post.tags.map((tag, index) => (
                                <li key={index} className="flex justify-between items-center bg-green-500 rounded-full px-4 py-1 my-1">
                                  <span className="font-bold text-white">{tag}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                    </div>
                </div>
                <div className="w-screen p-6 bg-white fixed bottom-0 left-0 border-t-2 shadow-2xl">
                    <div className="w-full lg:w-[1024px] m-auto px-0 md:px-4 flex justify-between items-center">
                        <Button onClick={handleEditModalOpen} className="flex items-center px-4 gap-2 rounded-full">
                            <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit Post
                        </Button>
                        <Button onClick={handleDeleteModalOpen} className="bg-red-500 flex items-center px-4 gap-2 rounded-full">
                            <TrashIcon strokeWidth={2} className="h-4 w-4" /> Delete Post
                        </Button>
                    </div>
                </div>    
            </>
        )}
        </div>
        <EditPostModal open={openEditModal} handleOpen={handleEditModalOpen} postData={post} setPost={setPost} />
        <EditPostImageModal open={openImageModal} handleOpen={handleImageModalOpen} postId={id} post={post} setPost={setPost} />
        <DeletePostModal open={openDeleteModal} handleOpen={handleDeleteModalOpen} postId={id} navigate={navigate} />
    </>
  );
}