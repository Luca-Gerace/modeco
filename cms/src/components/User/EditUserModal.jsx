import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input } from '@material-tailwind/react';
import { updateUser } from '../../services/api';
import Alert from '../Alert'
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function EditUserModal({ open, handleOpen, userData, setUser }) {
    const [editedUser, setEditedUser] = useState({
        name: userData.name || "",
        surname: userData.surname || "",
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (userData) {
            setEditedUser({
                name: userData.name || "",
                surname: userData.surname || "",
            });
        }
    }, [userData]);

    const handleChange = (value, name) => {
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateUser(userData._id, editedUser);

            setUser(prevUser => ({
                ...prevUser,
                ...response
            }));

            setAlert({ message: 'Profilo aggiornato con successo!', type: 'success' });
            handleOpen();

        } catch (error) {
            console.error("Error updating the profile:", error);
            setAlert({ message: 'Profile update error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <Dialog open={open} handler={handleOpen} dismissible={false}>
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Aggiorna Profilo
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
                                label="Nome"
                                name="name"
                                value={editedUser.name}
                                onChange={(e) => handleChange(e.target.value, 'name')}
                            />
                            <Input
                                label="Cognome"
                                name="surname"
                                value={editedUser.surname}
                                onChange={(e) => handleChange(e.target.value, 'surname')}
                            />
                        </div>
                        <div className="mt-6">
                            <Button type="button" onClick={handleSubmit} className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                                Aggiorna profilo
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}