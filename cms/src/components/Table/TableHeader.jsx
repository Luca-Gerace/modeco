import { Card, CardBody, Select, Option, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function TableHeader({
  title,
  filterOptions = [],
  filterValue,
  onFilterChange,
  searchTerm,
  onSearchChange,
  children
}) {
  return (
    <Card className="mb-6 border-2">
      <CardBody>
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <Typography variant="h2" color="blue-gray">
            {title}
          </Typography>
          {children}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {filterOptions.length > 0 && (
            <Select
              variant="outlined"
              label="Filter"
              value={filterValue}
              onChange={onFilterChange}
            >
              {filterOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}