import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './modules/UserContext';
import PrivateRoute from './components/PrivateRoute';
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
import Profile from "./pages/Profile";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <main className="w-full lg:w-[1024px] py-8 m-auto">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/clothes" element={<ShopClothes />} />
            <Route path="/cosmetics" element={<ShopCosmetics />} />
            <Route path="/food-and-beverage" element={<ShopFoodAndBaverage />} />
            <Route path="/second-hand" element={<ShopSecondHand />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/thank-you" element={<PrivateRoute><ThankYou /></PrivateRoute>} />
          </Routes>
        </main>
      </Router>
    </UserProvider>
  );
}

export default App;