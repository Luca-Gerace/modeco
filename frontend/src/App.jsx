import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './modules/UserContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import ShopClothes from "./pages/ShopClothes";
import ShopCosmetics from "./pages/ShopCosmetics";
import ShopFoodAndBeverage from "./pages/ShopFoodAndBeverage";
import ShopSecondHand from "./pages/ShopSecondHand";
import ThankYou from "./pages/Thankyou";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main className="w-full lg:w-[1024px] py-8 m-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/blog/:id" element={<Post />} />
            <Route path="/clothes" element={<ShopClothes />} />
            <Route path="/cosmetics" element={<ShopCosmetics />} />
            <Route path="/food-and-beverage" element={<ShopFoodAndBeverage />} />
            <Route path="/second-hand" element={<ShopSecondHand />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
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