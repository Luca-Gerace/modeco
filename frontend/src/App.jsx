import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './modules/UserContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Products from "./pages/Shop/Products";
import Checkout from "./pages/Checkout";
import ShopClothes from "./pages/Shop/ShopClothes";
import ShopCosmetics from "./pages/Shop/ShopCosmetics";
import ShopFoodAndBeverage from "./pages/Shop/ShopFoodAndBeverage";
import ShopSecondHand from "./pages/Shop/ShopSecondHand";
import ThankYou from "./pages/Thankyou";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import License from "./pages/License";
import Blog from "./pages/Blog";
import { useState } from "react";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Navbar cartCount={cartCount} setCartCount={setCartCount} />
        <main className="w-full lg:w-[1024px] py-8 m-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Post />} />
            <Route path="/licenses" element={<License />} />
            <Route path="/clothes" element={<ShopClothes />} />
            <Route path="/cosmetics" element={<ShopCosmetics />} />
            <Route path="/food-and-beverage" element={<ShopFoodAndBeverage />} />
            <Route path="/second-hand" element={<ShopSecondHand />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product setCartCount={setCartCount} />} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/thank-you" element={<PrivateRoute><ThankYou /></PrivateRoute>} />
          </Routes>
        <Footer />
        </main>
      </Router>
    </UserProvider>
  );
}

export default App;