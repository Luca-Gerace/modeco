import { useEffect, useState } from "react";
import { getLicenses } from "../../services/api";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import TableHeader from "../../components/Table/TableHeader";
import TableBody from "../../components/Table/TableBody";
import LicenseRow from "../../components/License/LicenseRow";
import CreateLicenseModal from "../../components/License/CreateLicenseModal";

export default function Licenses() {
  const [allLicenses, setAllLicenses] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const data = await getLicenses();
        setAllLicenses(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero dei license:', error);
        setLoading(false);
      }
    };
    fetchLicenses();
  }, []);

  useEffect(() => {
    const filteredData = allLicenses.filter(license => {
      const licenseName = license.name.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return licenseName.includes(searchLower);
    });
    setLicenses(filteredData);
  }, [searchTerm, allLicenses]);

  const tableHeaders = ["Image", "Name", "Description", "Website", "Email", "License details"];

  return (
    <div className="px-4">
      <TableHeader
        title="Licenses List"
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      >
        <Button onClick={handleOpen} className="flex items-center gap-3 rounded-full p-4" size="sm">
          <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add License
        </Button>
      </TableHeader>
      <TableBody
        theads={tableHeaders}
        rows={licenses}
        loading={loading}
        emptyText="No licenses found"
        RowComponent={LicenseRow}
        modal={<CreateLicenseModal open={open} handleOpen={handleOpen} setAllLicenses={setAllLicenses} />}
      />
    </div>
  );
}