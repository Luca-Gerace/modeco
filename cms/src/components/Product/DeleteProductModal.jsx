import { Dialog, DialogHeader, DialogBody, Button } from '@material-tailwind/react';
import { deleteProduct } from '../../services/api';
import { useState } from 'react';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

function ConfirmDeleteModal({ open, handleOpen, productId, navigate }) {
  const [alert, setAlert] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      setAlert({ message: 'Product deleted successfully!', type: 'success' });
      handleOpen(); // Close the modal
      navigate('/products'); // Navigate back to product list or other page
    } catch (error) {
      console.error('Error deleting product:', error);
      setAlert({ message: 'Error deleting product. Retry.', type: 'error' });
    }
  };

  return (
    <>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <Dialog open={open} handler={handleOpen} dismissible={false}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
              Confirm deletion
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
          <div className='flex flex-col gap-4 py-4'>
            <p className='text-black'>Are you sure you want to delete this product? This action cannot be undone.</p>
          </div>
          <div className="flex justify-between mt-6">
            <Button type="button" onClick={handleOpen} variant='outlined' className='rounded-full px-12'>
                Cancel
            </Button>
            <Button type="button" onClick={handleDelete} className='bg-red-500 rounded-full px-6'>
                Delete Product
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default ConfirmDeleteModal;
