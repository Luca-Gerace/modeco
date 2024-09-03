import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Select, Option } from '@material-tailwind/react';
import { updateOrder } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function EditOrderModal({ open, handleOpen, orderData, setOrder }) {
    const [orderStatus, setOrderStatus] = useState(orderData.status || "");
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (orderData) {
            setOrderStatus(orderData.status || "");
        }
    }, [orderData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateOrder(orderData._id, { status: orderStatus });

            setOrder(prevOrder => ({
                ...prevOrder,
                ...response,
            }));

            setAlert({ message: 'Order updated successfully!', type: 'success' });
            handleOpen();

        } catch (error) {
            console.error("Error updating the order:", error);
            setAlert({ message: 'Order update error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <Dialog open={open} handler={handleOpen} dismissible={false}>
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Edit Order
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
                            <Select
                                label="Order Status"
                                name="orderStatus"
                                value={orderStatus}
                                onChange={(value) => setOrderStatus(value)}
                            >
                                <Option value="pending">Pending</Option>
                                <Option value="confirmed">Confirmed</Option>
                                <Option value="cancelled">Cancelled</Option>
                            </Select>
                        </div>
                        <div className="mt-6">
                            <Button type="button" onClick={handleSubmit} className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                                Update Order
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}
