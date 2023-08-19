import React from "react";
import profileImage from "../assets/img/user_pic.png";
import OrderHistory from "../module/orders/OrderHistory";
import InviteCode from "../module/rewards/InviteCode";
import RewardHistory from "../module/rewards/RewardHistory";
import ViewReferral from "../module/rewards/ViewReferral";
import "../assets/css/dashboard.css";

import Footer from "../module/footer/Footer";

const Base = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row shadow ">
          <div className="col-lg-4 hero-container">
            <div className="pt-5 pb-3 text-center w-50 mx-auto">
              <img
                src={profileImage}
                className="w-50 m-auto "
                alt="Profile Image"
              />
              <h6 className="mt-3">Rashmi Prasad Roy</h6>
              <h6 className="mt-1">Age: 21</h6>
            </div>
            <div className="row shadow-sm bg-white">
              <div className="row mx-0 px-0">
                <InviteCode />
              </div>
              <div className="row mx-0 px-0">
                <RewardHistory />
              </div>
              <div className="row mx-0 px-0">
                <ViewReferral />
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
            <OrderHistory />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Base;
