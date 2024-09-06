import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

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

    useEffect(() => {
        const filteredPosts = posts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedTag ? post.tags.includes(selectedTag) : true);
        });

        setFilteredPosts(filteredPosts);
    }, [searchTerm, selectedTag, posts]);

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
                <div className="flex items-center gap-6 pt-8  border-t-2">
                    <Input
                        type="text"
                        label="Cerca articolo"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4 p-2 border rounded"
                    />
                    <select
                        className="peer w-full h-[40px] bg-transparent text-blue-gray-700 transition-all border focus:border-2 placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-gray-500  focus:border-t-[#333]"
                        label="Filtra articolo per tag"
                        onChange={(e) => setSelectedTag(e.target.value)}
                    >
                        <option value="">Seleziona un tag</option>
                        {Array.from(new Set(posts.flatMap(post => post.tags))).map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
                <ul className="flex flex-col gap-8 pt-6">
                    { !loading && (
                        <>
                            {filteredPosts.map((post) => (
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