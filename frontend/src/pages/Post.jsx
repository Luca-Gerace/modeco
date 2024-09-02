import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../services/api";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
// import SkeletonPage from "../../components/Skeleton/SkeletonPage";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

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
                {/* <SkeletonPage /> */}
            </>
        ) : (
            <>
                <div className="flex flex-col mb-20">
                    <div className="w-full relative mb-6 md:mb-0 h-[350px]">
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
            </>
        )}
        </div>
    </>
  );
}