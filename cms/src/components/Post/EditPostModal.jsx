import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Textarea } from '@material-tailwind/react';
import { updatePost } from '../../services/api';
import Alert from '../Alert';
import { IconButton, Typography } from '@mui/material';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

function EditPostModal({ open, handleOpen, postData, setPost }) {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [editedPost, setEditedPost] = useState({
        title: postData.title || "",
        content: postData.content || "",
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (postData) {
            setEditedPost({
                title: postData.title || "",
                content: postData.content || "",
            });
            setTags(postData.tags || []);
        }
    }, [postData]);

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
        setEditedPost({ ...editedPost, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
 
            const updatedPost = {
                ...editedPost,
                tags: tags,
            };

            const response = await updatePost(postData._id, updatedPost);

            setPost(prevPost => ({
                ...prevPost,
                ...response
            }));

            handleOpen();
            setAlert({ message: 'Post updated successfully!', type: 'success' });

        } catch (error) {
            console.error("Error updating the post:", error);
            setAlert({ message: 'Post update error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            <Dialog open={open} handler={handleOpen} dismissible={false}>
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Edit Post
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                    >
                        <XMarkIcon className="h-5 w-5" strokeWidth={2} />
                    </IconButton>
                </DialogHeader>
                <DialogBody className='border-t'>
                    <form>
                        <div className='flex flex-col gap-4 py-4'>
                            <Input
                                label="Title"
                                name="title"
                                value={editedPost.title}
                                onChange={(e) => handleChange(e.target.value, 'title')}
                            />
                            <Textarea
                                rows="10"
                                label="Content"
                                name="content"
                                value={editedPost.content}
                                onChange={(e) => handleChange(e.target.value, 'content')}
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
                            <Button type="button" onClick={handleSubmit} className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                                Update Post
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </>
    );
}

export default EditPostModal;
