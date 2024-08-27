import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Input } from '@material-tailwind/react';
import { updateProduct } from '../../services/api';
import Alert from '../../../../frontend/src/components/Alert';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

function EditProductModal({ open, handleOpen, productData, setProduct }) {
    const [sizes, setSizes] = useState(productData?.sizes || []);
    const [newSize, setNewSize] = useState('');
    const [productImage, setProductImage] = useState(null);
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

    const handleFileChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('price', Number(editedProduct.price));
            formData.append('quantity', Number(editedProduct.quantity));

            Object.keys(editedProduct).forEach((key) => {
                if (key !== 'price' && key !== 'quantity') {
                    formData.append(key, editedProduct[key]);
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

            const updateProductResponse = await updateProduct(productData._id, formData);

            // Update the state in the parent component
            setProduct(prevProduct => ({
                ...prevProduct,
                ...updateProductResponse.data
            }));

            handleOpen();
            setAlert({ message: 'Product updated successfully!', type: 'success' });

        } catch (error) {
            console.error("Error updating the product:", error.response.data);
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
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <DialogBody>
                    <form className="create-post-form" onSubmit={handleSubmit}>
                        <div className="flex items-center mb-4">
                            <img
                                src={productData.image}
                                alt="Current product"
                                className="w-20 h-20 object-cover mr-4"
                            />
                            <Input
                                type="file"
                                label="Product Image"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Input
                            type="text"
                            label="Description"
                            name="description"
                            value={editedProduct.description}
                            onChange={handleChange}
                        />
                        <Input
                            type="number"
                            label="Price"
                            name="price"
                            value={editedProduct.price}
                            onChange={handleChange}
                        />
                        <Input
                            type="number"
                            label="Quantity"
                            name="quantity"
                            value={editedProduct.quantity}
                            onChange={handleChange}
                        />
                        {editedProduct.category === "clothes" || editedProduct.category === "second hand" ? (
                            <>
                                <Input
                                    type="text"
                                    label="Color"
                                    name="color"
                                    value={editedProduct.color}
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
                        {editedProduct.category === "cosmetics" ? (
                            <Input
                                type="text"
                                label="Ingredients"
                                name="ingredients"
                                value={editedProduct.ingredients || ""}
                                onChange={handleChange}
                            />
                        ) : null}
                        {editedProduct.category === "food and beverage" ? (
                            <Input
                                type="text"
                                label="Nutrition Facts"
                                name="nutritionFacts"
                                value={editedProduct.nutritionFacts || ""}
                                onChange={handleChange}
                            />
                        ) : null}
                        <div className="flex justify-between mt-4">
                            <Button color="green" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default EditProductModal;