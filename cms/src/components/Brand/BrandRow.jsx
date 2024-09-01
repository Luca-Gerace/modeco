import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function BrandRow({ rowData }) {
    return (
        <tr key={rowData._id} className="border-b border-blue-gray-50 last:border-b-0">
            <td className="p-4 w-12">
                <Link to={`/brands/${rowData._id}`} className="block relative">
                    <img src={rowData.image} alt={rowData.name} className="w-12 h-12 border border-gray-900 rounded-full object-contain" />
                </Link>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.name}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.description.length > 40 ? `${rowData.description.slice(0, 40)}...` : rowData.description}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.website}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.email}
                </Typography>
            </td>
            <td className="py-4 w-44 ps-8 pe-0">
                <Button className="rounded-full px-4" size="sm" variant="outlined">
                    <Link to={`/brands/${rowData._id}`} className="flex items-center gap-3">
                        See details <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Link>
                </Button>
            </td>
        </tr>
    );
}
