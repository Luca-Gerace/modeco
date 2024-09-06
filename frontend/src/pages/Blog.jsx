import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero delle licenze:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-2 md:gap-10 py-4 px-4 lg:px-0">
        <div className="w-full relative mb-6 md:mb-0 h-[350px]">
            <img className="w-full h-[350px] object-cover rounded-xl" src='https://res.cloudinary.com/dicfymkdl/image/upload/v1725623738/blog-sostenibilita_wdx2dx.jpg' alt='Blog' />
        </div>
        <div className="flex flex-col gap-6">
            <h1 className="text-[32px] md:text-[38px] text-black font-bold leading-10 md:leading-[50px]">
                Il nostro <span className='text-green-500'>Blog green</span>
            </h1>
            <p className='text-[18px] lg:text-[20px]'>
                Esplora articoli e approfondimenti su <strong>moda sostenibile</strong>, pratiche <strong>eco-friendly</strong> e consigli per uno <strong>stile di vita più consapevole</strong>, in armonia con il pianeta.
            </p>
            <ul className="flex flex-col gap-8 pt-6">
                { !loading && (
                    <>
                        {posts.map((post) => (
                            <li key={post._id} className="flex flex-col md:flex-row w-full gap-6 items-center pb-8 border-b last:pb-0 last:border-0">
                                <img src={post.image} className="w-full h-56 md:w-32 md:h-32 object-cover rounded-xl" />
                                <div className="flex flex-col">
                                    <h2 className="font-bold text-[22px]">{post.title}</h2>
                                    <p className='text-[18px]'>{post.content.length > 180 ? `${post.content.slice(0, 180)}...` : post.content}</p>
                                    <div className="flex pt-4 items-center justify-between">
                                        <p>di {post.author.name} {post.author.surname} | {new Date(post.date).toLocaleDateString('it-IT')}</p>
                                        <Link to={`/blog/${post._id}`} className='flex gap-2 items-center text-black font-bold hover:underline'>
                                            <span>Leggi di più</span> <ArrowRightIcon className='w-6' />
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    </div>
  );
}