import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
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
          <Typography variant="h5" color="red">
            Confirm Deletion
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
        <DialogBody divider>
          Are you sure you want to delete this product? This action cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleDelete}>Delete</Button>
          <Button color="blue-gray" onClick={handleOpen}>Cancel</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ConfirmDeleteModal;
