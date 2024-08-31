import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import CreateProductModal from '../../components/Product/CreateProductModal';
import TableHeader from "../../components/Table/TableHeader";
import TableBody from "../../components/Table/TableBody";
import ProductRow from "../../components/Product/ProductRow";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState("clothes");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero del prodotto:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredData = allProducts
      .filter(product => product.category === productFilter)
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setProducts(filteredData);
  }, [productFilter, searchTerm, allProducts]);

  const tableHeaders = ["Image", "Type", "Brand", "Quantity", "Price", "Product details"];

  return (
    <>
      <TableHeader
        title="Products List"
        filterOptions={[
          { value: "clothes", label: "Clothes" },
          { value: "cosmetics", label: "Cosmetics" },
          { value: "food and beverage", label: "Food and Beverage" },
          { value: "second hand", label: "Second Hand" }
        ]}
        filterValue={productFilter}
        onFilterChange={setProductFilter}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      >
        <Button onClick={handleOpen} className="flex items-center gap-3 rounded-full p-4" size="sm">
          <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Product
        </Button>
      </TableHeader>
      <TableBody
        theads={tableHeaders}
        rows={products}  // Array di prodotti
        loading={loading}
        emptyText="No products found"
        RowComponent={ProductRow}  // Componente da usare per ogni riga
        modal={<CreateProductModal open={open} handleOpen={handleOpen} setAllProducts={setAllProducts} />}
      />
    </>
  );
}
