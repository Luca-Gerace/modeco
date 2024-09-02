// EditProfileImageModal.jsx
import { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input } from '@material-tailwind/react';
import { updateUserAvatar } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function EditUserImageModal({ open, handleOpen, user, setUser }) {
  const [profileImage, setProfileImage] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!profileImage) {
        setAlert({ message: 'Please select an image.', type: 'warning' });
        return;
      }

      const formData = new FormData();
      formData.append('avatar', profileImage);

      const response = await updateUserAvatar(user._id, formData);
      setUser(prevUser => ({
        ...prevUser,
        image: response.image
      }));
      setAlert({ message: 'Profile image updated successfully!', type: 'success' });
      handleOpen();
    } catch (error) {
      console.error("Error updating the profile image:", error);
      setAlert({ message: 'Profile image update error. Retry.', type: 'error' });
    }
  };

  return (
    <>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <Dialog open={open} handler={handleOpen} dismissible={false}>
        <DialogHeader onClick={handleOpen}>
          <Typography variant="h5" color="blue-gray">
            Edit Profile Image
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
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 py-4'>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="mt-6">
              <Button type="submit" className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                Update Profile Image
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}