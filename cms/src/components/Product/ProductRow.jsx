import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button, Chip, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function ProductRow({ rowData }) {
    return (
        <tr key={rowData._id} className="border-b border-blue-gray-50 last:border-b-0">
            <td className="p-4 w-12">
                <Link to={`/products/${rowData._id}`} className="block relative">
                    <img src={rowData.image} alt={rowData.name} className="w-12 h-12 border border-gray-900 rounded-full object-contain" />
                </Link>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.name.length > 28 ? `${rowData.name.slice(0, 28)}...` : rowData.name}
                </Typography>
            </td>
            <td className="p-4">
                <Typography 
                    variant="small" 
                    color="blue-gray" 
                    className={rowData.brand.name ? 'font-normal' : 'animate-pulse bg-gray-300 rounded-full h-9 w-12'}
                    >
                    {rowData.brand.name}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.category}
                </Typography>
            </td>
            <td className="p-4">
                <div className="w-max">
                    <Chip
                        variant="ghost"
                        size="sm"
                        value={rowData.quantity > 0 ? `${rowData.quantity} items` : "Out of stock"}
                        color={rowData.quantity > 0 ? "green" : "blue-gray"}
                    />
                </div>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    &euro;{rowData.price.toFixed(2)}
                </Typography>
            </td>
            <td className="py-4 w-44 ps-8 pe-0">
                <Button className="rounded-full px-4" size="sm" variant="outlined">
                    <Link to={`/products/${rowData._id}`} className="flex items-center gap-3">
                        See details <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Link>
                </Button>
            </td>
        </tr>
    );
}
