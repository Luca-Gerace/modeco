import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../../../services/api";
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function BlogSection() {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const data = await getPosts();
            setAllPosts(data);
            setLoading(false);
          } catch (error) {
            console.error('Errore nel recupero dei post:', error);
            setLoading(false);
          }
        };
        fetchPosts();
      }, []);

    return (
        <section className='w-full mt-8'>
            <div className='w-full py-6 lg:py-8 flex flex-col gap-8 relative'>
                <h2 className="text-[26px] md:text-[34px] text-black font-bold leading-8 md:leading-[40px] px-4 lg:px-0">
                    Il Blog <span className='text-green-500'>Green</span> di mod<span className='text-green-500'>eco</span>
                </h2>
                <p className='text-[18px] lg:text-[20px] px-4 lg:px-0'>
                    Tutti i nostri brand partner hanno certificati di produzione sostenibile.
                    <br />
                    <br />
                    Noi contribuiamo rendendo la tua esperienza di acquisto 100% rispettosa dell’ambiente, dal packaging fino al trasporto al tuo indirizzo.
                </p>
                <div className="flex flex-wrap gap-6 mx-4 lg:mx-0">

                    <div className="hidden md:flex md:overflow-hidden md:gap-6 pb-6">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            allPosts
                            .slice(0, 4)
                            .map((post) => (
                                <Link to={`/blog/${post._id}`} key={post._id} className='w-1/4 bg-white rounded-xl shadow-md hover:shadow-lg'>
                                    <img
                                        className="w-full h-36 object-cover border-green-500 border-b-4 rounded-t-xl"
                                        src={post.image}
                                        alt={post.title}
                                    />
                                    <div className='flex flex-col px-4 gap-3 pb-3'>
                                        <h3 className='font-bold pt-3'>{post.title.length > 22 ? `${post.title.slice(0, 22)} ...` : post.title}</h3>
                                        <p>{post.content.length > 60 ? `${post.content.slice(0, 60)}...` : post.content}</p>
                                        <span>{new Date(post.date).toLocaleDateString('it-IT')}</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    <div className="flex md:hidden overflow-x-auto gap-6 pb-4 scrollbar-hide pb-12">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            allPosts
                            .slice(0, 4)
                            .map((post) => (
                                <Link to={`/blog/${post._id}`} key={post._id} className='flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 bg-white rounded-xl shadow-lg hover:shadow-xl'>
                                    <img
                                        className="w-full h-36 object-cover border-green-500 border-b-4 rounded-t-xl"
                                        src={post.image}
                                        alt={post.title}
                                    />
                                    <div className='flex flex-col px-4 gap-3 pb-3'>
                                        <h3 className='font-bold pt-3'>{post.title.length > 20 ? `${post.title.slice(0, 20)} ...` : post.title}</h3>
                                        <p>{post.content.length > 60 ? `${post.content.slice(0, 60)}...` : post.content}</p>
                                        <span>{new Date(post.date).toLocaleDateString('it-IT')}</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
                <Link to='/blog' className='-mt-8 md:mt-0 px-4 md:px-0 flex gap-2 items-center flex-end text-black font-bold hover:underline justify-end'>
                    <span>Scopri di più</span> <ArrowRightIcon className='w-6' />
                </Link>
            </div >
        </section>
    );
}