import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Select, Option, Textarea, Slider } from '@material-tailwind/react';
import { updateProduct, getLicenses } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function EditProductModal({ open, handleOpen, productData = {}, setProduct }) {
    const [sizes, setSizes] = useState(productData.size || []);
    const [newSize, setNewSize] = useState('');
    const [selectedLicenses, setSelectedLicenses] = useState([]);
    const [newLicense, setNewLicense] = useState('');

    const [editedProduct, setEditedProduct] = useState({
        name: productData.name || "",
        category: productData.category,
        price: productData.price || 0,
        discount: productData.discount || 0,
        discountedPrice: productData.discountedPrice || 0,
        description: productData.description || "",
        quantity: productData.quantity || 0,
        color: productData.color || "",
        onSale: productData.discount > 0
    });

    const [licenses, setLicenses] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
                const licensesData = await getLicenses();
                setLicenses(licensesData);
            } catch (error) {
                console.error('Errore nel recupero delle licenze:', error);
            }
        };
        fetchLicenses();
    }, []);

    useEffect(() => {
        if (productData) {
            setEditedProduct({
                name: productData.name || "",
                category: productData.category,
                price: productData.price || 0,
                discount: productData.discount || 0,
                discountedPrice: productData.discountedPrice || 0,
                description: productData.description || "",
                quantity: productData.quantity || 0,
                color: productData.color || "",
                onSale: productData.discount > 0
            });
            setSizes(productData.size || []);
            setSelectedLicenses(productData.licenses || []);
        }
    }, [productData]);

    useEffect(() => {
        if (editedProduct.price && editedProduct.discount) {
            setEditedProduct(prev => ({
                ...prev,
                discountedPrice: prev.price * (1 - prev.discount / 100),
                onSale: editedProduct.discount > 0
            }));
        }
    }, [editedProduct.price, editedProduct.discount]);

    const handleAddSize = () => {
        if (newSize && !sizes.includes(newSize)) {
            setSizes([...sizes, newSize]);
            setNewSize('');
        }
    };

    const handleRemoveSize = (sizeToRemove) => {
        setSizes(sizes.filter(size => size !== sizeToRemove));
    };

    const handleAddLicense = () => {
        const licenseToAdd = licenses.find(license => license._id === newLicense);
        if (licenseToAdd && !selectedLicenses.some(license => license._id === licenseToAdd._id)) {
            setSelectedLicenses([...selectedLicenses, licenseToAdd]);
            setNewLicense('');
        }
    };

    const handleRemoveLicense = (licenseToRemove) => {
        setSelectedLicenses(selectedLicenses.filter(license => license !== licenseToRemove));
    };

    const handleChange = (value, name) => {
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedProduct = {
                ...editedProduct,
                size: sizes,
                licenses: selectedLicenses
            };

            const response = await updateProduct(productData._id, updatedProduct);

            setProduct(prevProduct => ({
                ...prevProduct,
                ...response
            }));

            handleOpen();
            setAlert({ message: 'Product updated successfully!', type: 'success' });

        } catch (error) {
            console.error("Error updating the product:", error.response?.data);
            setAlert({ message: 'Product update error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            <Dialog open={open} handler={handleOpen} dismissible={false}>
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Edit Product
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
                        <div className='flex flex-col gap-4 py-4 overflow-scroll h-[32rem]'>
                            <Input
                                label="Name"
                                name="name"
                                value={editedProduct.name}
                                onChange={(e) => handleChange(e.target.value, 'name')}
                            />
                            <Textarea
                                label="Description"
                                name="description"
                                value={editedProduct.description}
                                onChange={(e) => handleChange(e.target.value, 'description')}
                            />
                            <Input
                                type="number"
                                label="Price"
                                name="price"
                                value={editedProduct.price}
                                onChange={(e) => handleChange(e.target.value, 'price')}
                                required
                            />

                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center justify-between'>
                                    <span>Sale: <strong>{editedProduct.discount}%</strong></span>
                                    <span>Discounted price: <strong>&euro;{editedProduct.discountedPrice.toFixed(2)}</strong></span>
                                </div>
                                <Slider
                                    defaultValue={0}
                                    // value={Number(newProduct.discount)}
                                    barClassName='bg-green-500 relative'
                                    min={0}
                                    max={70}
                                    step={10}
                                    value={editedProduct.discount}
                                    onChange={(e) => handleChange(e.target.value, 'discount')}
                                />
                            </div>
                            <Input
                                label="Quantity"
                                name="quantity"
                                type='number'
                                value={editedProduct.quantity}
                                onChange={(e) => handleChange(e.target.value, 'quantity')}
                            />
                            {(editedProduct.category === 'clothes' || editedProduct.category === 'second_hand') && (
                                <>
                                    <Input
                                        label="Color"
                                        name="color"
                                        value={editedProduct.color}
                                        onChange={(e) => handleChange(e.target.value, 'color')}
                                    />
                                    <div className="flex gap-4">
                                        <Input
                                            type="text"
                                            label="Add Size"
                                            value={newSize}
                                            onChange={(e) => setNewSize(e.target.value)}
                                        />
                                        <Button onClick={handleAddSize} className='flex gap-2 px-4 items-center rounded-full'>
                                            <PlusIcon className='h-4 w-4' /> Add
                                        </Button>
                                    </div>
                                    {sizes.length > 0 && (
                                        <ul className="list-disc flex gap-2">
                                            {sizes.map((size, index) => (
                                                <li key={index} className="flex justify-between items-center bg-[#333] hover:bg-[#242424] rounded-full px-4 py-1 my-1">
                                                    <span className="font-bold text-white text-[12px]">{size}</span>
                                                    <button onClick={() => handleRemoveSize(size)} className="ml-2 text-white bg-green">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                            <div className="flex gap-4">
                                <Select
                                    label="Licenses"
                                    name="licenses"
                                    value={newLicense || ''}
                                    onChange={(value) => setNewLicense(value)}
                                >
                                    {licenses.map((license) => (
                                        <Option key={license._id} value={license._id}>{license.name}</Option>
                                    ))}
                                </Select>
                                <Button onClick={handleAddLicense} className='flex gap-2 px-4 items-center rounded-full'>
                                    <PlusIcon className='h-4 w-4' /> Add
                                </Button>
                            </div>
                            {selectedLicenses.length > 0 && (
                                <ul className="list-disc flex gap-2">
                                    {selectedLicenses.map((license, index) => (
                                        <li key={index} className="flex justify-between items-center bg-[#333] hover:bg-[#242424] rounded-full px-4 py-1 my-1">
                                            <span className="font-bold text-white text-[12px]">
                                                {license.name}
                                            </span>
                                            <button onClick={() => handleRemoveLicense(license)} className="ml-2 text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="flex justify-between mt-6">
                            <Button type="button" onClick={handleSubmit} className='bg-green-500 rounded-full px-6'>
                                Update Product
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </>
    );
}