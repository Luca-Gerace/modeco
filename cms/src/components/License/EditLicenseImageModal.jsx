import { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from '@material-tailwind/react';
import { updateLicenseImage } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function EditLicenseImageModal({ open, handleOpen, license, licenseId, setLicense }) {

  const [licenseImage, setLicenseImage] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleFileChange = (e) => {
    setLicenseImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!licenseImage) {
        setAlert({ message: 'Please select an image', type: 'error' });
        return;
      }

      const updatedLicense = await updateLicenseImage(licenseId, licenseImage);
      
      setLicense(prev => ({ ...prev, image: updatedLicense.image }));

      handleOpen(); // Close modal after successful update
      setAlert({ message: 'Image updated successfully!', type: 'success' });
    } catch (error) {
      console.error("Error updating license image:", error);
      setAlert({ message: 'Error updating image. Retry.', type: 'error' });
    }
  };

  return (
    <>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <Dialog open={open} handler={handleOpen} dismissible={false}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Edit License Image
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
          <form onSubmit={handleSubmit}>
            <div className='flex items-center gap-4 py-4'>
              <img className="w-16" src={license.image} alt={license.name} />
              <Input
                type="file"
                label="License Image"
                onChange={handleFileChange}
              />
            </div>
            <DialogFooter>
              <Button className='bg-green-500 rounded-full px-12 m-auto' onClick={handleSubmit}>Update image</Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
