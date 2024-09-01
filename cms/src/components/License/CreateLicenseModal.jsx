import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Textarea } from '@material-tailwind/react';
import { createLicense } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function CreateLicenseModal({ open, handleOpen, setAllLicenses }) {
    const [licenseImage, setLicenseImage] = useState(null);
    const [newLicense, setNewLicense] = useState({
        name: "",
        description: "",
        website: "",
        email: "",
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleChange = (value, name) => {
        setNewLicense({ ...newLicense, [name]: value });
    };

    const handleFileChange = (e) => {
        setLicenseImage(e.target.files[0]);
    };

    useEffect(() => {
        const validateForm = () => {
            if (newLicense.name && newLicense.description && newLicense.website && newLicense.email) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        };

        validateForm();
    }, [newLicense]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            if (licenseImage) {
                formData.append('image', licenseImage);
            }

            const newLicenseResponse = await createLicense(formData);
            setAllLicenses(prevLicenses => [...prevLicenses, newLicenseResponse.data]);

            handleOpen();
            setAlert({ message: 'License created successfully!', type: 'success' });

        } catch (error) {
            console.error("Error creating the license:", error.response.data);
            setAlert({ message: 'License creation error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <Dialog open={open} handler={handleOpen} dismissible={false} >
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Add New License
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
                                value={newLicense.name}
                                onChange={(e) => handleChange(e.target.value, 'name')}
                                required
                            />
                            <Input
                                type="file"
                                label="License Logo"
                                onChange={handleFileChange}
                                required
                            />
                            <Textarea
                                type="text"
                                label="Description"
                                name="description"
                                value={newLicense.description}
                                onChange={(e) => handleChange(e.target.value, 'description')}
                                required
                            />
                            <Input
                                type="text"
                                label="Website"
                                name="website"
                                value={newLicense.website}
                                onChange={(e) => handleChange(e.target.value, 'website')}
                                required
                            />  
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={newLicense.email}
                                onChange={(e) => handleChange(e.target.value, 'email')}
                                required
                            />                            
                        </div>
                        <div className="mt-6">
                            <Button type="button" onClick={handleSubmit} disabled={!isFormValid} className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                                <CheckIcon className='w-4' /> Save License
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}