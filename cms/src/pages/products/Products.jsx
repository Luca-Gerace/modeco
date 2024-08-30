import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getProducts } from "../../services/api";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowRightIcon,
  ArchiveBoxXMarkIcon
} from "@heroicons/react/24/solid";
import {
  Card,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  Select,
  Option
} from "@material-tailwind/react";
import CreateProductModal from '../../components/Product/CreateProductModal';
import SkeletonRow from '../../components/Skeleton/SkeletonRow';

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
        setLoading(false)
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

  return (
    <>
    <Card className="mb-6 border-2">
      <CardBody>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h2" color="blue-gray">
              Products list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button onClick={handleOpen} className="flex items-center gap-3 rounded-full p-4" size="sm">
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Select
            variant="outlined"
            label="Filter by Category"
            value={productFilter}
            onChange={(value) => setProductFilter(value)}
          >
            <Option value="clothes">Clothes</Option>
            <Option value="cosmetics">Cosmetics</Option>
            <Option value="food and beverage">Food and Beverage</Option>
            <Option value="second hand">Second Hand</Option>
          </Select>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardBody>
    </Card>
    <Card className="h-full w-full border-2 p-6">
      <CardBody className="p-0 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <td className="p-4">Image</td>
              <td className="p-4">Type</td>
              <td className="p-4">Brand</td>
              <td className="p-4">Quantity</td>
              <td className="p-4">Price</td>
              <td className="py-4 ps-8">Product details</td>
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
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  <div className="flex flex-col items-center gap-6 py-12">
                    <ArchiveBoxXMarkIcon className="h-12 w-12" />
                    <h2 className="text-[36px] font-bold text-center">No items found</h2>
                  </div>
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product._id} className="border-b border-blue-gray-50 last:border-b-0">
                  <td className="p-4 w-12">
                    <Link to={`/products/${product._id}`} className="block relative">
                      <Avatar src={product.image} alt={product.name} size="sm" />
                    </Link>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.brand}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={product.quantity > 0 ? `${product.quantity} items` : "Out of stock"}
                        color={product.quantity > 0 ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      &euro;{product.price.toFixed(2)}
                    </Typography>
                  </td>
                  <td className="py-4 w-44 ps-8 pe-0">
                    <Button className="rounded-full px-4" size="sm" variant="outlined">
                      <Link to={`/products/${product._id}`} className="flex items-center gap-3">
                        See details <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardBody>
      <CreateProductModal open={open} handleOpen={handleOpen} setAllProducts={setAllProducts} />
    </Card>
    </>
  );
}