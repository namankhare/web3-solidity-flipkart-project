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
import Partner from "./core/partner/Partner";
import FLPZone from "./core/partner/FLPZone";
import ClaimedRewards from "./core/partner/ClaimedRewards";

function App() {
  const { setIsLoggedIn, setAuthUser } = useContext(GlobalContext);

  // function to refresh Auth on page reload
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
          referredUsers: data.user.referredUsers,
          OrderHistory: data.user.OrderHistory
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
          referredUsers: [],
          OrderHistory: []
        });
      }
    }
  }, [setAuthUser, setIsLoggedIn]);

  useEffect(() => {
    // trigger function for re-auth
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
        <Route path="/partner" element={<Partner />} />
        <Route path="/flpzone" element={<FLPZone />} />
        <Route path="/claimedrewards" element={<ClaimedRewards />} />

      </Routes>
    </>
  );
}
export default App;
