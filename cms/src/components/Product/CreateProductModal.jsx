import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Select, Option, Textarea } from '@material-tailwind/react';
import { createProduct, getBrands, getLicenses } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function CreateProductModal({ open, handleOpen, setAllProducts }) {
    const [step, setStep] = useState(1);
    const [isStep1Valid, setIsStep1Valid] = useState(false);
    const [isStep2Valid, setIsStep2Valid] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [allLicenses, setAllLicenses] = useState([]);
    const [newLicense, setNewLicense] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [newProduct, setNewProduct] = useState({
        brand: "",
        name: "",
        price: 0,
        category: "clothes",
        type: "",
        description: "",
        quantity: 0,
        color: "",
        licenses: [],
    });
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState("clothes");
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
                const LicensesData = await getLicenses();
                setAllLicenses(LicensesData);
            } catch (error) {
                console.error('Errore nel recupero delle licenze:', error);
            }
        };
        fetchLicenses();
    }, []);

    useEffect(() => {
        const validateStep1 = () => {
            if (newProduct.brand && newProduct.category && newProduct.type && newProduct.name) {
                setIsStep1Valid(true);
            } else {
                setIsStep1Valid(false);
            }
        };

        validateStep1();
    }, [newProduct]);

    useEffect(() => {
        const validateStep2 = () => {
            if (newProduct.description && newProduct.price && newProduct.quantity) {
                setIsStep2Valid(true);
            } else if ((newProduct.category === 'clothes' || newProduct.category === 'second hand') && (newProduct.color && newProduct.size)) {
                setIsStep2Valid(true);
            } else {
                setIsStep2Valid(false);
            }
        };

        validateStep2();
    }, [newProduct]);

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
        if (newLicense && !newProduct.licenses.includes(newLicense)) {
            setNewProduct({
                ...newProduct,
                licenses: [...newProduct.licenses, newLicense]  // Aggiungi licenza come ID separato
            });
            setNewLicense('');  // Resetta la selezione
        }
    };

    const handleRemoveLicense = (licenseToRemove) => {
        setNewProduct({
            ...newProduct,
            licenses: newProduct.licenses.filter(license => license !== licenseToRemove)
        });
    };

    const handleChange = (value, name) => {
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('price', Number(newProduct.price));
            formData.append('quantity', Number(newProduct.quantity));

            Object.keys(newProduct).forEach((key) => {
                if (key !== 'price' && key !== 'quantity') {
                    if (key === 'licenses') {
                        newProduct.licenses.forEach((license) => {
                            formData.append('licenses[]', license);
                        });
                    } else {
                        formData.append(key, newProduct[key]);
                    }
                }
            });

            if (productImage) {
                formData.append('image', productImage);
            }

            if (sizes.length > 0) {
                sizes.forEach((size) => {
                    formData.append('size[]', size);
                });
            }

            const newProductResponse = await createProduct(formData);
            setAllProducts(prevProducts => [...prevProducts, newProductResponse.data]);

            handleOpen();
            setAlert({ message: 'Product created successfully!', type: 'success' });
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {
            console.error("Error creating the product:", error.response.data);
            setAlert({ message: 'Product creation error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <Dialog open={open} handler={handleOpen} dismissible={false} >
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Add New Product
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
                            {step === 1 && (
                                <>
                                    <Select
                                        label="Brand"
                                        name="brand"
                                        value={newProduct.brand}
                                        onChange={(value) => handleChange(value, 'brand')}
                                        required
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
                                            setNewProduct({ ...newProduct, category: value });
                                        }}
                                        required
                                    >
                                        <Option value="clothes">Clothes</Option>
                                        <Option value="cosmetics">Cosmetics</Option>
                                        <Option value="food and beverage">Food and Beverage</Option>
                                        <Option value="second hand">Second Hand</Option>
                                    </Select>
                                    <Input
                                        type="text"
                                        label="Product Type"
                                        name="type"
                                        value={newProduct.type}
                                        onChange={(e) => handleChange(e.target.value, 'type')}
                                        required
                                    />
                                    <Input
                                        type="text"
                                        label="Product Name"
                                        name="name"
                                        value={newProduct.name}
                                        onChange={(e) => handleChange(e.target.value, 'name')}
                                        required
                                    />
                                    <div className="flex gap-4">
                                        <Select
                                            label="Licenses"
                                            name="licenses"
                                            value={newLicense}
                                            onChange={(value) => setNewLicense(value)}
                                        >
                                            {allLicenses.map((license) => (
                                                <Option key={license._id} value={license._id}>{license.name}</Option>
                                            ))}
                                        </Select>
                                        <Button onClick={handleAddLicense} className='flex gap-2 px-4 items-center rounded-full'>
                                            <PlusIcon className='h-4 w-4' /> Add
                                        </Button>
                                    </div>
                                    {newProduct.licenses.length > 0 && (
                                        <ul className="list-disc flex gap-2">
                                            {newProduct.licenses.map((license, index) => (
                                                <li key={index} className="flex justify-between items-center bg-[#333] hover:bg-[#242424] rounded-full px-4 py-1 my-1">
                                                    <span className="font-bold text-white text-[12px]">
                                                        {allLicenses.find(l => l._id === license)?.name || license}
                                                    </span>
                                                    <button onClick={() => handleRemoveLicense(license)} className="ml-2 text-white bg-green">
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
                            {step === 2 && (
                                <>
                                    <Input
                                        type="file"
                                        label="Product Image"
                                        onChange={handleFileChange}
                                        required
                                    />
                                    <Textarea
                                        type="text"
                                        label="Description"
                                        name="description"
                                        value={newProduct.description}
                                        onChange={(e) => handleChange(e.target.value, 'description')}
                                        required
                                    />
                                    <Input
                                        type="number"
                                        label="Price"
                                        name="price"
                                        value={newProduct.price}
                                        onChange={(e) => handleChange(e.target.value, 'price')}
                                        required
                                    />
                                    <Input
                                        type="number"
                                        label="Quantity"
                                        name="quantity"
                                        value={newProduct.quantity}
                                        onChange={(e) => handleChange(e.target.value, 'quantity')}
                                        required
                                    />
                                    {category === "clothes" || category === "second hand" ? (
                                        <>
                                            <Input
                                                type="text"
                                                label="Color"
                                                name="color"
                                                value={newProduct.color}
                                                onChange={(e) => handleChange(e.target.value, 'color')}
                                                required
                                            />
                                            <div className="flex gap-4">
                                                <Input
                                                    type="text"
                                                    label="Add Size"
                                                    value={newSize}
                                                    onChange={(e) => setNewSize(e.target.value)}
                                                    required
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
                                    ) : null}
                                </>
                            )}
                        </div>
                        <div className="flex justify-between mt-6">
                            {step > 1 && (
                                <Button type="button" onClick={() => setStep(step - 1)} variant='outlined' className='flex items-center gap-3 rounded-full px-6'>
                                    <ArrowLeftIcon className='w-4' /> Previous
                                </Button>
                            )}
                            {step < 2 ? (
                                <Button type="button" onClick={() => setStep(step + 1)} disabled={!isStep1Valid} className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                                    Next <ArrowRightIcon className='w-4' />
                                </Button>
                            ) : (
                                <Button type="button" onClick={handleSubmit} disabled={!isStep2Valid} className='flex items-center gap-3 bg-green-500 rounded-full px-6'>
                                    <CheckIcon className='w-4' /> Save Product
                                </Button>
                            )}
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}