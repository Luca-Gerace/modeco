import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input } from '@material-tailwind/react';
import { updateProduct } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

function EditProductModal({ open, handleOpen, productData, setProduct }) {
    const [sizes, setSizes] = useState(productData?.size || []);
    const [newSize, setNewSize] = useState('');
    const [editedProduct, setEditedProduct] = useState({
        brand: productData?.brand || "",
        name: productData?.name || "",
        price: productData?.price || 0,
        category: productData?.category || "clothes",
        description: productData?.description || "",
        quantity: productData?.quantity || 0,
        color: productData?.color || "",
        ingredients: productData?.ingredients || "",
        nutritionFacts: productData?.nutritionFacts || ""
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (productData) {
            setEditedProduct({
                brand: productData.brand,
                name: productData.name,
                price: productData.price,
                category: productData.category,
                description: productData.description,
                quantity: productData.quantity,
                color: productData.color,
                ingredients: productData.ingredients,
                nutritionFacts: productData.nutritionFacts
            });
            setSizes(productData.size || []);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedProduct = {
                ...editedProduct,
                size: sizes
            };

            const response = await updateProduct(productData._id, updatedProduct);

            // Aggiorna lo stato del prodotto nel componente padre
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
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <Dialog open={open} handler={handleOpen}>
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
                <DialogBody divider>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Brand"
                            name="brand"
                            value={editedProduct.brand}
                            onChange={handleChange}
                        />
                        <Input
                            label="Name"
                            name="name"
                            value={editedProduct.name}
                            onChange={handleChange}
                        />
                        <Input
                            label="Price"
                            name="price"
                            value={editedProduct.price}
                            onChange={handleChange}
                        />
                        <Input
                            label="Category"
                            name="category"
                            value={editedProduct.category}
                            onChange={handleChange}
                        />
                        {editedProduct.category === 'clothes' && (
                            <>
                                <Input
                                    label="Color"
                                    name="color"
                                    value={editedProduct.color}
                                    onChange={handleChange}
                                />
                                <div>
                                    <label>Sizes:</label>
                                    <div>
                                        {sizes.map((size) => (
                                            <div key={size}>
                                                <span>{size}</span>
                                                <Button onClick={() => handleRemoveSize(size)}>Remove</Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Input
                                        label="Add Size"
                                        name="newSize"
                                        value={newSize}
                                        onChange={(e) => setNewSize(e.target.value)}
                                    />
                                    <Button onClick={handleAddSize}>Add Size</Button>
                                </div>
                            </>
                        )}
                        <Input
                            label="Description"
                            name="description"
                            value={editedProduct.description}
                            onChange={handleChange}
                        />
                        <Input
                            label="Quantity"
                            name="quantity"
                            value={editedProduct.quantity}
                            onChange={handleChange}
                        />
                        <Button type="submit">Save Changes</Button>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default EditProductModal;