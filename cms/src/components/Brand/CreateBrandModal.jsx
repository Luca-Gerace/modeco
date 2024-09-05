import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Textarea } from '@material-tailwind/react';
import { createBrand } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function CreateBrandModal({ open, handleOpen, setAllBrands }) {
    const [brandImage, setBrandImage] = useState(null);
    const [newBrand, setNewBrand] = useState({
        name: "",
        description: "",
        website: "",
        email: "",
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleChange = (value, name) => {
        setNewBrand({ ...newBrand, [name]: value });
    };

    const handleFileChange = (e) => {
        setBrandImage(e.target.files[0]);
    };

    useEffect(() => {
        const validateForm = () => {
            if (newBrand.name && newBrand.description && newBrand.website && newBrand.email) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        };

        validateForm();
    }, [newBrand]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            if (brandImage) {
                formData.append('image', brandImage);
            }

            formData.append('name', newBrand.name);
            formData.append('description', newBrand.description);
            formData.append('website', newBrand.website);
            formData.append('email', newBrand.email);

            const newBrandResponse = await createBrand(formData);
            setAllBrands(prevBrands => [...prevBrands, newBrandResponse.data]);

            handleOpen();
            setAlert({ message: 'Brand created successfully!', type: 'success' });

        } catch (error) {
            console.error("Error creating the brand:", error.response.data);
            setAlert({ message: 'Brand creation error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <Dialog open={open} handler={handleOpen} dismissible={false} >
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Add New Brand
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
                                label="Name"
                                name="name"
                                value={newBrand.name}
                                onChange={(e) => handleChange(e.target.value, 'name')}
                                required
                            />
                            <Input
                                type="file"
                                label="Brand Logo"
                                onChange={handleFileChange}
                                required
                            />
                            <Textarea
                                type="text"
                                label="Description"
                                name="description"
                                value={newBrand.description}
                                onChange={(e) => handleChange(e.target.value, 'description')}
                                required
                            />
                            <Input
                                type="text"
                                label="Website"
                                name="website"
                                value={newBrand.website}
                                onChange={(e) => handleChange(e.target.value, 'website')}
                                required
                            />  
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={newBrand.email}
                                onChange={(e) => handleChange(e.target.value, 'email')}
                                required
                            />                            
                        </div>
                        <div className="mt-6">
                            <Button type="button" onClick={handleSubmit} disabled={!isFormValid} className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                                <CheckIcon className='w-4' /> Save Brand
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}