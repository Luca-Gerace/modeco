import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Textarea } from '@material-tailwind/react';
import { updateBrand } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

function EditBrandModal({ open, handleOpen, brandData, setBrand }) {
    const [editedBrand, setEditedBrand] = useState({
        brand: brandData.brand || "",
        name: brandData.name || "",
        description: brandData.description || "",
        website: brandData.website || "",
        email: brandData.email || "",
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (brandData) {
            setEditedBrand({
                brand: brandData.brand || "",
                name: brandData.name || "",
                description: brandData.description || "",
                website: brandData.website || "",
                email: brandData.email || "",
            });
        }
    }, [brandData]);

    const handleChange = (value, name) => {
        setEditedBrand({ ...editedBrand, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
 
            const response = await updateBrand(brandData._id, editedBrand);

            setBrand(prevBrand => ({
                ...prevBrand,
                ...response
            }));

            handleOpen();
            setAlert({ message: 'Brand updated successfully!', type: 'success' });

        } catch (error) {
            console.error("Error updating the brand:", error);
            setAlert({ message: 'Brand update error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            <Dialog open={open} handler={handleOpen} dismissible={false}>
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Edit Brand
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
                                label="Name"
                                name="name"
                                value={editedBrand.name}
                                onChange={(e) => handleChange(e.target.value, 'name')}
                            />
                            <Textarea
                                label="Description"
                                name="description"
                                value={editedBrand.description}
                                onChange={(e) => handleChange(e.target.value, 'description')}
                            />
                            <Input
                                label="Website"
                                name="website"
                                value={editedBrand.website}
                                onChange={(e) => handleChange(e.target.value, 'website')}
                            />
                            <Input
                                label="Email"
                                name="email"
                                type='email'
                                value={editedBrand.email}
                                onChange={(e) => handleChange(e.target.value, 'email')}
                            />
                        </div>
                        <div className="mt-6">
                            <Button type="button" onClick={handleSubmit} className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                                Update Brand
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </>
    );
}

export default EditBrandModal;
