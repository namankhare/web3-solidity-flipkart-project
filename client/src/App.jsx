import { Route, Routes } from "react-router-dom";
import Dashboard from "./core/admin/Dashboard";
import Login from "./core/auth/Login";
import Signup from "./core/auth/Signup";
import Shop from "./core/shop/Shop";
import Product from "./core/seller/Product";
import Order from "./core/orders/Order";
import Rewards from "./core/rewards/Rewards";
import "./style.css";
import { useCallback, useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalContext";
import axios from "axios";
import PageNotFound from "./core/page404/PageNotFound";
import Guideline from "./core/guidelines/guideline";

function App() {
  const { setIsLoggedIn, setAuthUser } = useContext(GlobalContext);

  const refreshAuthState = useCallback(async () => {
    let getRefreshToken = localStorage.getItem("refreshtoken");
    if (getRefreshToken) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/refreshauthstate`,
        { refreshToken: getRefreshToken },
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data.status === "success") {
        setIsLoggedIn(true);
        setAuthUser({
          userid: data.user._id,
          username: data.user.username,
          name: data.user.name,
          role: data.user.role,
          email: data.user.email,
          phone: data.user.phone,
        });
      } else {
        setIsLoggedIn(false);
        setAuthUser({
          userid: "",
          username: "",
          name: "",
          role: "",
          email: "",
          phone: 0,
        });
      }
    }
  }, [setAuthUser, setIsLoggedIn]);

  useEffect(() => {
    refreshAuthState();
  }, [refreshAuthState]);
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
        <Route path="*" element={<PageNotFound />} />
        <Route path="/guidelines" element={<Guideline />} />
      </Routes>
    </>
  );
}
export default App;
