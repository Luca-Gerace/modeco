import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function PostRow({ rowData }) {
    return (
        <tr key={rowData._id} className="border-b border-blue-gray-50 last:border-b-0">
            <td className="p-4 w-12">
                <Link to={`/posts/${rowData._id}`} className="block relative">
                    <img src={rowData.image} alt={rowData.name} className="w-12 h-12 border border-gray-900 rounded-full object-cover" />
                </Link>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.title.length > 20 ? `${rowData.title.slice(0, 20)}...` : rowData.title}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.content.length > 30 ? `${rowData.content.slice(0, 30)}...` : rowData.content}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {rowData.author.name} {rowData.author.surname}
                </Typography>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {new Date(rowData.date).toLocaleDateString('it-IT')}
                </Typography>
            </td>
            <td className="py-4 w-44 ps-8 pe-0">
                <Button className="rounded-full px-4" size="sm" variant="outlined">
                    <Link to={`/posts/${rowData._id}`} className="flex items-center gap-3">
                        See details <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Link>
                </Button>
            </td>
        </tr>
    );
}
