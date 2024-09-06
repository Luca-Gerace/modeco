import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, Button, Radio, Slider, Checkbox } from '@material-tailwind/react';
import { IconButton, Typography } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ProductsFilter({ open, handleOpen, applyFilters, currentFilters, minPrice, maxPrice }) {
    const [localFilters, setLocalFilters] = useState({ category: "", type: [], price: null }); // `type` as array

    useEffect(() => {
        setLocalFilters({
            category: currentFilters.category,
            type: currentFilters.type,
            price: currentFilters.price || minPrice
        });
    }, [currentFilters, open, minPrice]);

    // Gestisce il cambiamento per valori di tipo array (checkbox multiple)
    const handleCheckboxChange = (value, name) => {
        const currentValues = localFilters[name];
        let updatedValues;

        // Se il valore esiste già, lo rimuove, altrimenti lo aggiunge
        if (currentValues.includes(value)) {
            updatedValues = currentValues.filter(item => item !== value);
        } else {
            updatedValues = [...currentValues, value];
        }

        setLocalFilters({ ...localFilters, [name]: updatedValues });
    };

    const handleChange = (value, name) => {
        setLocalFilters({ ...localFilters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters(localFilters);
    };

    return (
        <>
            <Dialog open={open} handler={handleOpen} dismissible={false} >
                <DialogHeader onClick={handleOpen}>
                    <Typography variant="h5" color="blue-gray">
                        Filtra i prodotti
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
                        <div className='flex flex-col gap-4 px-4 w-full'>
                            {/* Filtra per categoria */}
                            <div className="flex flex-col gap-4 border-b pb-4">
                                <strong>Filtra per categoria prodotto:</strong>
                                <div className='flex gap-4'>
                                    <div className='border-2 rounded-full w-full'>
                                        <Radio name="category" value="clothes" checked={localFilters.category === "clothes"} onChange={(e) => handleChange(e.target.value, "category")} label="Abbigliamento" />
                                    </div>
                                    <div className='border-2 rounded-full w-full'>
                                        <Radio name="category" value="food_and_beverage" checked={localFilters.category === "food_and_beverage"} onChange={(e) => handleChange(e.target.value, "category")} label="Cibo e bevande" />
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='border-2 rounded-full w-full'>
                                        <Radio name="category" value="second_hand" checked={localFilters.category === "second_hand"} onChange={(e) => handleChange(e.target.value, "category")} label="Second Hand" />
                                    </div>
                                    <div className='border-2 rounded-full w-full'>
                                        <Radio name="category" value="cosmetics" checked={localFilters.category === "cosmetics"} onChange={(e) => handleChange(e.target.value, "category")} label="Cosmetici" />
                                    </div>
                                </div>
                            </div>

                            {/* Filtra per tipologia */}
                            <div className="flex flex-col gap-4 border-b pb-4">
                                <strong>Filtra per tipologia di prodotto:</strong>
                                {localFilters.category === "clothes" || localFilters.category === "second_hand" ? (
                                    <>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="T-shirt" checked={localFilters.type.includes("T-shirt")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="T Shirt" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Sweatshirt" checked={localFilters.type.includes("Sweatshirt")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Felpe" />
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Jacket" checked={localFilters.type.includes("Jacket")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Giacche" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Pants" checked={localFilters.type.includes("Pants")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Pantaloni" />
                                            </div>
                                        </div>
                                    </>
                                ) : localFilters.category === "food_and_beverage" ? (
                                    <>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Dishes" checked={localFilters.type.includes("Dishes")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Piatti pronti" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Beverage" checked={localFilters.type.includes("Beverage")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Bevande" />
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Appetizer" checked={localFilters.type.includes("Appetizer")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Stuzzichini" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Dessert" checked={localFilters.type.includes("Dessert")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Dessert" />
                                            </div>
                                        </div>
                                    </>
                                ) : localFilters.category === "cosmetics" ? (
                                    <>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Parfum" checked={localFilters.type.includes("Parfum")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Profumi" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Lotion" checked={localFilters.type.includes("Lotion")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Prodotti corpo" />
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Beauty" checked={localFilters.type.includes("Beauty")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Prodotti viso" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Pants" checked={localFilters.type.includes("Pants")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Trucchi" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className='flex flex-col gap-4 pb-4 overflow-scroll h-[11rem]'>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="T-shirt" checked={localFilters.type.includes("T-shirt")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="T Shirt" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Sweatshirt" checked={localFilters.type.includes("Sweatshirt")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Felpe" />
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Jacket" checked={localFilters.type.includes("Jacket")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Giacche" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Pants" checked={localFilters.type.includes("Pants")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Pantaloni" />
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Dishes" checked={localFilters.type.includes("Dishes")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Piatti pronti" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Beverage" checked={localFilters.type.includes("Beverage")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Bevande" />
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Appetizer" checked={localFilters.type.includes("Appetizer")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Stuzzichini" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Dessert" checked={localFilters.type.includes("Dessert")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Dessert" />
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Parfum" checked={localFilters.type.includes("Parfum")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Profumi" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Lotion" checked={localFilters.type.includes("Lotion")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Prodotti corpo" />
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Beauty" checked={localFilters.type.includes("Beauty")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Prodotti viso" />
                                            </div>
                                            <div className='border-2 rounded-full w-full'>
                                                <Checkbox name="type" value="Makeup" checked={localFilters.type.includes("Makeup")} onChange={(e) => handleCheckboxChange(e.target.value, "type")} label="Trucchi" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Filtra per prezzo */}
                            <div className="flex flex-col gap-3">
                                <strong>Prezzo fino a:</strong>
                                <Slider
                                    defaultValue={minPrice}
                                    value={localFilters.price}
                                    barClassName='bg-green-500 relative'
                                    min={minPrice}
                                    max={maxPrice}
                                    step={1}
                                    onChange={(e) => handleChange(e.target.value, "price")}
                                />
                                <span>{localFilters.price} €</span>
                            </div>                            
                        </div>
                        <div className="mt-2">
                            <Button type="button" onClick={handleSubmit} className='flex items-center gap-3 bg-green-500 rounded-full px-6 m-auto'>
                                Filtra prodotti
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}
