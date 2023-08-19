import { Route, Routes } from "react-router-dom";
import Dashboard from "./core/admin/Dashboard";
import Login from "./core/auth/Login";
import Signup from "./core/auth/Signup";
import Shop from "./core/shop/Shop";
import Product from "./core/seller/Product";
import Order from "./core/orders/Order";
import Rewards from "./core/rewards/Rewards";
import "./style.css";

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL)
  return (
    <>

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </>
  );

}
export default App;
