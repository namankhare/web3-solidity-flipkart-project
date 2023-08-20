import Header from "../module/header/Header";
import profileImage from "../assets/img/profile.png";
import OrderHistory from "../module/orders/OrderHistory";
import InviteCode from "../module/rewards/InviteCode";
import RewardHistory from "../module/rewards/RewardHistory";
import ViewReferral from "../module/rewards/ViewReferral";
import "../assets/css/dashboard.css";
import Footer from "../module/footer/Footer";
import Navbar from "../module/header/Navbar";
import { useContext, useEffect } from "react";
import apiClient from "../helper/apiClient";
import { GlobalContext } from "../context/GlobalContext";

const Base = () => {
  const { isLoggedIn, authUser } = useContext(GlobalContext);

  useEffect(() => {
    // apiClient.get(`/user/getUser`).then(({ data }) => {

    // })
  }, [])

  return (
    <div>
      <Header />
      <Navbar />
      <div className="container-fluid">
        <div className="row shadow ">
          <div className="col-lg-4 hero-container">
            <div className="pt-5 pb-3 text-center w-50 mx-auto">
              <img
                src={profileImage}
                className="w-50 m-auto "
                alt="Profile Image"
              />
              <h6 className="mt-3">{authUser.name}</h6>
              {/* <h6 className="mt-1">Age: 21</h6> */}
            </div>
            <div className="row shadow-sm bg-white">
              <div className="row mx-0 px-0">
                <InviteCode authUser={authUser} />
              </div>
              {/* <div className="row mx-0 px-0">
                <RewardHistory />
              </div> */}
              <div className="row mx-0 px-0">
                <ViewReferral authUser={authUser} />
              </div>
            </div>
          </div>
          <div className="col-lg-8 bg-white my-1  px-0">
            <h6
              className="py-3 fw-bold border border-light rounded-3 shadow-sm text-center"
              style={{ background: "#fff5dd" }}
            >
              My Orders
            </h6>
            <OrderHistory authUser={authUser} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Base;
