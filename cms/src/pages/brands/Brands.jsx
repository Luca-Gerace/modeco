import { useEffect, useState } from "react";
import { getBrands } from "../../services/api";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import CreateProductModal from '../../components/Product/CreateProductModal';
import TableHeader from "../../components/Table/TableHeader";
import TableBody from "../../components/Table/TableBody";
import BrandRow from "../../components/Brand/BrandRow";

export default function Brands() {
  const [allBrands, setAllBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setAllBrands(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero dei brand:', error);
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const filteredData = allBrands.filter(brand => {
      const brandName = brand.name.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return brandName.includes(searchLower);
    });
    setBrands(filteredData);
  }, [searchTerm, allBrands]);

  const tableHeaders = ["Image", "Name", "Description", "Website", "Email", "Brand details"];

  return (
    <div className="px-4">
      <TableHeader
        title="Brands List"
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      >
        <Button onClick={handleOpen} className="flex items-center gap-3 rounded-full p-4" size="sm">
          <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Brand
        </Button>
      </TableHeader>
      <TableBody
        theads={tableHeaders}
        rows={brands}
        loading={loading}
        emptyText="No brands found"
        RowComponent={BrandRow}
        modal={<CreateProductModal open={open} handleOpen={handleOpen} setAllBrands={setAllBrands} />}
      />
    </div>
  );
}
