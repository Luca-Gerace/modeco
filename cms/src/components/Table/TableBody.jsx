import { Card, CardBody } from "@material-tailwind/react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
import SkeletonRow from "../Skeleton/SkeletonRow";

export default function TableBody({
  theads,
  rows,
  loading,
  emptyText,
  RowComponent,
  modal
}) {
  return (
    <Card className="h-full w-full border-2 p-6">
      <CardBody className="p-0 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {theads.map((header, index) => (
                <td key={index} className={`${index === theads.length - 1 ? 'py-4 ps-8' : 'p-4'}`}>{header}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={theads.length} className="text-center p-4">
                  <div className="flex flex-col items-center gap-6 py-12">
                    <ArchiveBoxXMarkIcon className="h-12 w-12" />
                    <h2 className="text-[36px] font-bold text-center">{emptyText}</h2>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <RowComponent key={row._id} rowData={row} />
              ))
            )}
          </tbody>
        </table>
      </CardBody>
      {modal}
    </Card>
  );
}