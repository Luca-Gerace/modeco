import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input, Select, Option } from '@material-tailwind/react';
import { createProduct, getBrands, getLicenses } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

function NewProductModal({ open, handleOpen, setAllProducts }) {
    const [step, setStep] = useState(1);
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
                        // Converti l'array di licenze in valori separati nel formData
                        newProduct.licenses.forEach((license) => {
                            formData.append('licenses[]', license); // Aggiungi ogni licenza separatamente
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
            <Dialog open={open} handler={handleOpen} dismissible={false}>
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
                <DialogBody divider>
                    <form className="create-post-form">
                        {step === 1 && (
                            <>
                                <Select
                                    label="Brand"
                                    name="brand"
                                    value={newProduct.brand}
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
                                        setNewProduct({ ...newProduct, category: value });
                                    }}
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
                                />
                                <Input
                                    type="text"
                                    label="Product Name"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={(e) => handleChange(e.target.value, 'name')}
                                />
                                <div className="my-4">
                                    <Select
                                        label="Licenses"
                                        name="licenses"
                                        value={newLicense}  // Usare una stringa singola per il valore
                                        onChange={(value) => setNewLicense(value)}  // Imposta il singolo valore
                                    >
                                        {allLicenses.map((license) => (
                                            <Option key={license._id} value={license._id}>{license.name}</Option>
                                        ))}
                                    </Select>
                                    <Button color="blue" onClick={handleAddLicense}>
                                        Add License
                                    </Button>
                                </div>
                                {newProduct.licenses.length > 0 && (
                                    <div className="my-4 flex gap-2 items-center">
                                        <h4>Licenses:</h4>
                                        <ul className="list-disc flex gap-2">
                                            {newProduct.licenses.map((license, index) => (
                                                <li key={index} className="flex justify-between items-center bg-[#333] hover:bg-[#242424] rounded-full px-4 py-1 my-1">
                                                    <span className="font-bold text-white">
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
                                    </div>
                                )}
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Input
                                    type="file"
                                    label="Product Image"
                                    onChange={handleFileChange}
                                />
                                <Input
                                    type="text"
                                    label="Description"
                                    name="description"
                                    value={newProduct.description}
                                    onChange={(e) => handleChange(e.target.value, 'description')}
                                />
                                <Input
                                    type="number"
                                    label="Price"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={(e) => handleChange(e.target.value, 'price')}
                                />
                                <Input
                                    type="number"
                                    label="Quantity"
                                    name="quantity"
                                    value={newProduct.quantity}
                                    onChange={(e) => handleChange(e.target.value, 'quantity')}
                                />
                                {category === "clothes" || category === "second hand" ? (
                                    <>
                                        <Input
                                            type="text"
                                            label="Color"
                                            name="color"
                                            value={newProduct.color}
                                            onChange={(e) => handleChange(e.target.value, 'color')}
                                        />
                                        <div className="my-4">
                                            <Input
                                                type="text"
                                                label="Add Size"
                                                value={newSize}
                                                onChange={(e) => setNewSize(e.target.value)}
                                            />
                                            <Button color="blue" onClick={handleAddSize}>
                                                Add Size
                                            </Button>
                                        </div>
                                        {sizes.length > 0 && (
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
                                        )}
                                    </>
                                ) : null}
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
        </>
    );
}

export default NewProductModal;
