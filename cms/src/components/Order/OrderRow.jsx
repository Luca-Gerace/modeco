import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function OrderRow({ rowData }) {
    return (
        <tr key={rowData._id} className="border-b border-blue-gray-50 last:border-b-0">
            <td className="p-4 w-12">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {new Date(rowData.createdAt).toLocaleDateString('it-IT')}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.userId.email.length > 40 ? `${rowData.userId.email.slice(0, 40)}...` : rowData.userId.email}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.shippingAddress.length > 40 ? `${rowData.shippingAddress.slice(0, 40)}...` : rowData.shippingAddress}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.totalQuantity}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.totalPrice.toFixed(2)}&euro;
                </Typography>
            </td>
            <td className="p-4">
                <span
                    className={`uppercase text-[12px] p-1.5 rounded-md ${
                        rowData.status === 'pending'
                        ? 'bg-gray-300 text-gray-900'
                        : rowData.status === 'cancelled'
                        ? 'bg-red-300 text-red-900'
                        : 'bg-green-300 text-green-900'
                    }`}
                >
                    {rowData.status}
                </span>
            </td>
            <td className="py-4 w-44 ps-8 pe-0">
                <Button className="rounded-full px-4" size="sm" variant="outlined">
                    <Link to={`/orders/${rowData._id}`} className="flex items-center gap-3">
                        See details <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Link>
                </Button>
            </td>
        </tr>
    );
}
