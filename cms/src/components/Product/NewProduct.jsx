import { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Select, Option } from '@material-tailwind/react';
import { createProduct } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';

function NewProductModal({ open, handleOpen, setAllProducts }) {

    // Hook - taglie prodotto
    const [sizes, setSizes] = useState([]);
    const [newSize, setNewSize] = useState('');

    // Hook - immagine del prodotto
    const [productImage, setProductImage] = useState(null);

    // Hook - prodotto nuovo
    const [newProduct, setNewProduct] = useState({
        brand: "",
        name: "",
        price: 0,
        category: "clothes",
        description: "",
        quantity: 0,
        color: "",
    });

    // Hook - category
    const [category, setCategory] = useState("clothes");

    // Hook - alert
    const [alert, setAlert] = useState(null);

    const handleAddSize = () => {
        if (newSize && !sizes.includes(newSize)) {
            setSizes([...sizes, newSize]);
            setNewSize('');
        }
    };

    const handleRemoveSize = (sizeToRemove) => {
        setSizes(sizes.filter(size => size !== sizeToRemove));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Product file handler
    const handleFileChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            // Conversion to Number
            formData.append('price', Number(newProduct.price));
            formData.append('quantity', Number(newProduct.quantity));

            Object.keys(newProduct).forEach((key) => {
                if (key !== 'price' && key !== 'quantity') {
                    formData.append(key, newProduct[key]);
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
    
        } catch (error) {
            console.error("Error creating the product:", error.response.data);
            setAlert({ message: 'Product creation error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader onClick={handleOpen}>
                    Add New Product
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit} className="create-post-form">
                        <Input
                            type="text"
                            label="Brand Name"
                            name="brand"
                            value={newProduct.brand}
                            onChange={handleChange}
                        />
                        <Input
                            type="text"
                            label="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                        />
                        <Input
                            type="number"
                            label="Price"
                            name="price"
                            value={newProduct.price}
                            onChange={handleChange}
                        />
                        <Input
                            type="text"
                            label="Description"
                            name="description"
                            value={newProduct.description}
                            onChange={handleChange}
                        />
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
                            type="file"
                            label="Product Image"
                            onChange={handleFileChange}
                        />
                        <Input
                            type="number"
                            label="Quantity"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleChange}
                        />
                        {category === "clothes" || category === "second hand" ? (
                            <>
                                <Input
                                    type="text"
                                    label="Color"
                                    name="color"
                                    value={newProduct.color}
                                    onChange={handleChange}
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
                                    <div className="my-4">
                                        <h4>Sizes:</h4>
                                        <ul className="list-disc ml-4">
                                            {sizes.map((size, index) => (
                                                <li key={index} className="flex justify-between">
                                                    {size}
                                                    <Button color="red" onClick={() => handleRemoveSize(size)}>
                                                        Remove
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : null}
                        {category === "cosmetics" ? (
                            <Input
                                type="text"
                                label="Ingredients"
                                name="ingredients"
                                value={newProduct.ingredients || ""}
                                onChange={handleChange}
                            />
                        ) : null}
                        {category === "food and beverage" ? (
                            <Input
                                type="text"
                                label="Nutrition Facts"
                                name="nutritionFacts"
                                value={newProduct.nutritionFacts || ""}
                                onChange={handleChange}
                            />
                        ) : null}
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button color="green" type="submit" onClick={handleSubmit}>
                        Save Product
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default NewProductModal;