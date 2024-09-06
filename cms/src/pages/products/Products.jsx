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
  const [productFilter, setProductFilter] = useState("all");
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
      .filter(product => productFilter === "all" || product.category === productFilter)
      .filter(product => {
        const productName = product.name.toLowerCase();
        const productType = product.type.toLowerCase();
        const productBrand = typeof product.brand === 'string' ? product.brand.toLowerCase() : product.brand.name.toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return productName.includes(searchLower) || productBrand.includes(searchLower) || productType.includes(searchLower);
      });
    setProducts(filteredData);
  }, [productFilter, searchTerm, allProducts]);

  const tableHeaders = ["Image", "Name", "Brand", "Category", "Quantity", "Price", "Product details"];

  return (
    <div className="px-4">
      <TableHeader
        title="Products List"
        filterOptions={[
          { value: "all", label: "All products" },
          { value: "clothes", label: "Clothes" },
          { value: "cosmetics", label: "Cosmetics" },
          { value: "food_and_beverage", label: "Food and Beverage" },
          { value: "second_hand", label: "Second Hand" }
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
        rows={products}
        loading={loading}
        emptyText="No products found"
        RowComponent={ProductRow}
        modal={<CreateProductModal open={open} handleOpen={handleOpen} setAllProducts={setAllProducts} />}
      />
    </div>
  );
}
