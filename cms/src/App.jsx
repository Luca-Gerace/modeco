import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/posts/Posts";
import Post from "./pages/posts/Post";
import Users from "./pages/users/Users";
import User from "./pages/users/User";
import Orders from "./pages/orders/Orders";
import Order from "./pages/orders/Order";
import Products from "./pages/Products/Products";
import Product from "./pages/Products/Product";
import Brands from "./pages/brands/Brands";
import Brand from "./pages/brands/Brand";
import Licenses from "./pages/licenses/Licenses";
import License from "./pages/licenses/License";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="w-full lg:w-[1024px] py-8 m-auto">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:id" element={<Brand />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/licenses/:id" element={<License />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<Order />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;