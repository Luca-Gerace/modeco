import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import ShopClothes from "./pages/ShopClothes";
import ShopCosmetics from "./pages/ShopCosmetics";
import ShopFoodAndBaverage from "./pages/ShopFoodAndBaverage";
import ShopSecondHand from "./pages/ShopSecondHand";
import Wishlist from "./pages/Wishlist";
import ThankYou from "./pages/Thankyou";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="w-full lg:w-[1024px] px-4 py-8 m-auto">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/clothes" element={<ShopClothes />} />
          <Route path="/cosmetics" element={<ShopCosmetics />} />
          <Route path="/food-and-beverage" element={<ShopFoodAndBaverage />} />
          <Route path="/second-hand" element={<ShopSecondHand />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;