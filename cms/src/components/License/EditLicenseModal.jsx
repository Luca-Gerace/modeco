import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Textarea } from '@material-tailwind/react';
import { updateLicense } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

function EditLicenseModal({ open, handleOpen, licenseData, setLicense }) {
    const [editedLicense, setEditedLicense] = useState({
        name: licenseData.name || "",
        description: licenseData.description || "",
        website: licenseData.website || "",
        email: licenseData.email || "",
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (licenseData) {
            setEditedLicense({
                name: licenseData.name || "",
                description: licenseData.description || "",
                website: licenseData.website || "",
                email: licenseData.email || "",
            });
        }
    }, [licenseData]);

    const handleChange = (value, name) => {
        setEditedLicense({ ...editedLicense, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
 
            const response = await updateLicense(licenseData._id, editedLicense);

            setLicense(prevLicense => ({
                ...prevLicense,
                ...response
            }));

            handleOpen();
            setAlert({ message: 'License updated successfully!', type: 'success' });

        } catch (error) {
            console.error("Error updating the license:", error);
            setAlert({ message: 'License update error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            <Dialog open={open} handler={handleOpen} dismissible={false}>
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Edit License
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
                                value={editedLicense.name}
                                onChange={(e) => handleChange(e.target.value, 'name')}
                            />
                            <Textarea
                                label="Description"
                                name="description"
                                value={editedLicense.description}
                                onChange={(e) => handleChange(e.target.value, 'description')}
                            />
                            <Input
                                label="Website"
                                name="website"
                                value={editedLicense.website}
                                onChange={(e) => handleChange(e.target.value, 'website')}
                            />
                            <Input
                                label="Email"
                                name="email"
                                type='email'
                                value={editedLicense.email}
                                onChange={(e) => handleChange(e.target.value, 'email')}
                            />
                        </div>
                        <div className="mt-6">
                            <Button type="button" onClick={handleSubmit} className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                                Update License
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </>
    );
}

export default EditLicenseModal;
