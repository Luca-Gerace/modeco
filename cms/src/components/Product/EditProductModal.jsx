import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Select, Option } from '@material-tailwind/react';
import { getBrands, updateProduct, getLicenses } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

function EditProductModal({ open, handleOpen, productData = {}, setProduct }) {
    const [step, setStep] = useState(1);
    const [sizes, setSizes] = useState(productData.size || []);
    const [newSize, setNewSize] = useState('');
    const [selectedLicenses, setSelectedLicenses] = useState([]);
    const [newLicense, setNewLicense] = useState('');

    const [editedProduct, setEditedProduct] = useState({
        brand: productData.brand || "",
        name: productData.name || "",
        type: productData.type || "",
        price: productData.price || 0,
        category: productData.category || "clothes",
        description: productData.description || "",
        quantity: productData.quantity || 0,
        color: productData.color || "",
    });

    const [brands, setBrands] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [category, setCategory] = useState(productData.category || "clothes");
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const brandsData = await getBrands();
                setBrands(brandsData);
            } catch (error) {
                console.error('Errore nel recupero dei brand:', error);
            }
        };
        fetchBrands();
    }, []);

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
                brand: productData.brand || "",
                name: productData.name || "",
                type: productData.type || "",
                price: productData.price || 0,
                category: productData.category || "clothes",
                description: productData.description || "",
                quantity: productData.quantity || 0,
                color: productData.color || "",
                ingredients: productData.ingredients || "",
                nutritionFacts: productData.nutritionFacts || ""
            });
            setSizes(productData.size || []);
            setSelectedLicenses(productData.licenses || []);
        }
    }, [productData]);

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
        if (newLicense && !selectedLicenses.includes(newLicense)) {
            setSelectedLicenses([...selectedLicenses, newLicense]);
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

            // Aggiorna lo stato del prodotto nel componente padre
            setProduct(prevProduct => ({
                ...prevProduct,
                ...response
            }));

            handleOpen();
            setAlert({ message: 'Product updated successfully!', type: 'success' });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
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
                        {step === 1 && (
                            <>
                                <Select
                                    label="Brand"
                                    name="brand"
                                    value={editedProduct.brand}
                                    onChange={(value) => handleChange(value, 'brand')}
                                >
                                    {brands.map((brand) => (
                                        <Option key={brand._id} value={brand._id}>{brand.name}</Option>
                                    ))}
                                </Select>
                                <Select
                                    label="Category"
                                    value={category}
                                    onChange={(value) => {
                                        setCategory(value);
                                        setEditedProduct({ ...editedProduct, category: value });
                                    }}
                                >
                                    <Option value="clothes">Clothes</Option>
                                    <Option value="cosmetics">Cosmetics</Option>
                                    <Option value="food and beverage">Food and Beverage</Option>
                                    <Option value="second hand">Second Hand</Option>
                                </Select>
                                <Input
                                    label="Type"
                                    name="type"
                                    value={editedProduct.type}
                                    onChange={(e) => handleChange(e.target.value, 'type')}
                                />
                                <Input
                                    label="Name"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={(e) => handleChange(e.target.value, 'name')}
                                />
                                <div className="my-4">
                                    <Select
                                        label="Licenses"
                                        value={newLicense}
                                        onChange={(value) => setNewLicense(value)}
                                    >
                                        {licenses.map((license) => (
                                            <Option key={license._id} value={license._id}>{license.name}</Option>
                                        ))}
                                    </Select>
                                    <Button color="blue" onClick={handleAddLicense}>
                                        Add License
                                    </Button>
                                    {selectedLicenses.length > 0 && (
    <div className="my-4 flex gap-2 items-center">
        <h4>Licenses:</h4>
        <ul className="list-disc flex gap-2">
            {selectedLicenses.map((licenseId, index) => {
                // Trova la licenza corrispondente all'ID
                const license = licenses.find(l => l._id === licenseId);
                
                return (
                    <li key={index} className="flex justify-between items-center bg-[#333] hover:bg-[#242424] rounded-full px-4 py-1 my-1">
                        <span className="font-bold text-white">
                            {license ? license.name : 'Unknown License'}
                        </span>
                        <button onClick={() => handleRemoveLicense(licenseId)} className="ml-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </li>
                );
            })}
        </ul>
    </div>
)}
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Input
                                    label="Description"
                                    name="description"
                                    value={editedProduct.description}
                                    onChange={(e) => handleChange(e.target.value, 'description')}
                                />
                                <Input
                                    label="Price"
                                    name="price"
                                    type='number'
                                    value={editedProduct.price}
                                    onChange={(e) => handleChange(e.target.value, 'price')}
                                />
                                <Input
                                    label="Quantity"
                                    name="quantity"
                                    type='number'
                                    value={editedProduct.quantity}
                                    onChange={(e) => handleChange(e.target.value, 'quantity')}
                                />
                                {(editedProduct.category === 'clothes' || editedProduct.category === 'second hand') && (
                                    <>
                                        <Input
                                            label="Color"
                                            name="color"
                                            value={editedProduct.color}
                                            onChange={(e) => handleChange(e.target.value, 'color')}
                                        />
                                        <div>
                                            <Input
                                                label="Add Size"
                                                name="newSize"
                                                value={newSize}
                                                onChange={(e) => setNewSize(e.target.value)}
                                            />
                                            <Button onClick={handleAddSize}>Add Size</Button>
                                            <div className="my-4 flex gap-2 items-center">
                                                <h4>Sizes:</h4>
                                                <ul className="list-disc flex gap-2">
                                                    {sizes.map((size, index) => (
                                                        <li key={index} className="flex justify-between items-center bg-[#333] hover:bg-[#242424] rounded-full px-4 py-1 my-1">
                                                            <span className="font-bold text-white">{size}</span>
                                                            <button onClick={() => handleRemoveSize(size)} className="ml-2 text-white">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        <div className="flex justify-between mt-4">
                            {step > 1 && (
                                <Button color="blue" type="button" onClick={() => setStep(step - 1)}>
                                    Previous
                                </Button>
                            )}
                            {step < 2 ? (
                                <Button color="green" type="button" onClick={() => setStep(step + 1)}>
                                    Next
                                </Button>
                            ) : (
                                <Button color="green" type="button" onClick={handleSubmit}>
                                    Save Product
                                </Button>
                            )}
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </>
    );
}

export default EditProductModal;
