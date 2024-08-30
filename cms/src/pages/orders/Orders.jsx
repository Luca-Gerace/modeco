import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getProducts } from "../../services/api";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Select,
  Option,
  Tooltip,
} from "@material-tailwind/react";
import NewProductModal from '../../components/Product/NewProduct';

export default function Orders() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState("clothes");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data); // Store products data in a new array 
      } catch (error) {
        console.error('Errore nel recupero del prodotto:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filtra i prodotti ogni volta che activeTab cambia
    const filteredData = allProducts.filter(product => product.category === productFilter);
    setProducts(filteredData);
  }, [productFilter, allProducts]);

  return (
    <Card className="h-full w-full border-2 ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h2" color="blue-gray">
              Products list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button onClick={handleOpen} className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Select variant="outlined" label="Filter by Category" value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
            <Option value="clothes">Clothes</Option>
            <Option value="cosmetics">Cosmetics</Option>
            <Option value="food and beverage">Food and Beverage</Option>
            <Option value="second hand">Second Hand</Option>
          </Select>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="pb-0 overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <td className="p-4">Brand and Name</td>
              <td className="p-4">Color</td>
              <td className="p-4">Sizes</td>
              <td className="p-4">Quantity</td>
              <td className="p-4">Price</td>
              <td className="p-4">Edit</td>
            </tr>
          </thead>
          <tbody>
          {products.map(product => (
              <tr key={product._id} className="border-b border-blue-gray-50 last:border-b-0">
                  <td className="p-4">
                    <Link to={`/products/${product._id}`} className="block relative">
                      <div className="flex items-center gap-3">
                        <Avatar src={product.image} alt={product.name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {product.brand}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {product.name}
                          </Typography>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal p-4"
                    >
                      {product.color}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal p-4"
                    >
                      {product.size.join(', ')}
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
                  <td className="p-4">
                    <Tooltip content="Edit Product">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
              </tr>
          ))}
          </tbody>
        </table>
      </CardBody>
      <NewProductModal open={open} handleOpen={handleOpen} setAllProducts={setAllProducts} />
    </Card>
  );
}