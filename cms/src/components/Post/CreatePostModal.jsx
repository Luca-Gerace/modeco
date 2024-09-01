import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Textarea } from '@material-tailwind/react';
import { createPost, getUserData } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function CreatePostModal({ open, handleOpen, setAllPosts }) {
    const [user, setUser] = useState(null);
    const [postImage, setPostImage] = useState(null);
    const [newPost, setNewPost] = useState({ title: "", content: "" });
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [alert, setAlert] = useState(null);

    // Recupera i dati utente al montaggio del componente
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getUserData();
                    setUser(userData);
                } catch (err) {
                    console.error('Token non valido', err);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        checkLoginStatus();
    }, []);

    // Aggiorna i dati del post quando l'utente viene recuperato
    useEffect(() => {
        if (user) {
            setNewPost(prevPost => ({
                ...prevPost,
                author: {
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                },
            }));
        }
    }, [user]);

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleChange = (value, name) => {
        setNewPost({ ...newPost, [name]: value });
    };

    const handleFileChange = (e) => {
        setPostImage(e.target.files[0]);
    };

    // Valida il form quando i dati del post cambiano
    useEffect(() => {
        const validateForm = () => {
            if (newPost.title && newPost.content && user) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        };

        validateForm();
    }, [newPost, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', newPost.title);
            formData.append('content', newPost.content);
            if (postImage) {
                formData.append('image', postImage);
            }
            // Aggiungo i dettagli dell'autore se presenti
            if (newPost.author) {
                formData.append('author[name]', newPost.author.name);
                formData.append('author[surname]', newPost.author.surname);
                formData.append('author[email]', newPost.author.email);
            }

            if (tags.length > 0) {
                tags.forEach((tag) => {
                    formData.append('tags[]', tag);
                });
            }

            const newPostResponse = await createPost(formData);
            setAllPosts(prevPosts => [...prevPosts, newPostResponse.data]);

            handleOpen();
            setAlert({ message: 'Post creato con successo!', type: 'success' });
        } catch (error) {
            console.error("Errore durante la creazione del post:", error.response?.data || error.message);
            setAlert({ message: 'Errore durante la creazione del post. Riprova.', type: 'error' });
        }
    };

    return (
        <>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <Dialog open={open} handler={handleOpen} dismissible={false}>
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Aggiungi Nuovo Post
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className='border-t'>
                    <form>
                        <div className='flex flex-col gap-4 py-4'>
                            <Input
                                type="text"
                                label="Titolo"
                                name="title"
                                value={newPost.title}
                                onChange={(e) => handleChange(e.target.value, 'title')}
                                required
                            />
                            <Input
                                type="file"
                                label="Image"
                                onChange={handleFileChange}
                                required
                            />
                            <Textarea
                                rows="10"
                                type="text"
                                label="Contenuto"
                                name="content"
                                value={newPost.content}
                                onChange={(e) => handleChange(e.target.value, 'content')}
                                required
                            />
                            <div className="flex gap-4">
                                <Input
                                    type="text"
                                    label="Add Tag"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    required
                                />
                                <Button onClick={handleAddTag} className='flex gap-2 px-4 items-center rounded-full'>
                                    <PlusIcon className='h-4 w-4' /> Add
                                </Button>
                            </div>
                            {tags.length > 0 && (
                                <ul className="list-disc flex gap-2">
                                    {tags.map((tag, index) => (
                                        <li key={index} className="flex justify-between items-center bg-[#333] hover:bg-[#242424] rounded-full px-4 py-1 my-1">
                                            <span className="font-bold text-white text-[12px]">{tag}</span>
                                            <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-white bg-green">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="mt-6">
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!isFormValid}
                                className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'
                            >
                                <CheckIcon className='w-4' /> Salva Post
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}