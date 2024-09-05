import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './modules/UserContext';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/posts/Posts";
import Post from "./pages/posts/Post";
import Orders from "./pages/orders/Orders";
import Order from "./pages/orders/Order";
import Products from "./pages/Products/Products";
import Product from "./pages/Products/Product";
import Brands from "./pages/brands/Brands";
import Brand from "./pages/brands/Brand";
import Licenses from "./pages/licenses/Licenses";
import License from "./pages/licenses/License";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Stats from "./pages/stats/Stats";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main className="w-full lg:w-[1024px] py-8 m-auto">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/stats" element={<PrivateRoute><Stats /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
            <Route path="/products/:id" element={<PrivateRoute><Product /></PrivateRoute>} />
            <Route path="/brands" element={<PrivateRoute><Brands /></PrivateRoute>} />
            <Route path="/brands/:id" element={<PrivateRoute><Brand /></PrivateRoute>} />
            <Route path="/licenses" element={<PrivateRoute><Licenses /></PrivateRoute>} />
            <Route path="/licenses/:id" element={<PrivateRoute><License /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="/orders/:id" element={<PrivateRoute><Order /></PrivateRoute>} />
            <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
            <Route path="/posts/:id" element={<PrivateRoute><Post /></PrivateRoute>} />
          </Routes>
          <PrivateRoute><Footer /></PrivateRoute>
        </main>
      </Router>
    </UserProvider>
  );
}

export default App;