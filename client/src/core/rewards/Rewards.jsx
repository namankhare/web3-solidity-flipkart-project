import React, { useState } from "react";
import Navbar from "../../module/header/Navbar";
import "../../assets/css/dashboard.css";
import rewardImage from "../../assets/img/rewards.png";

const Reward = () => {
  const [loyaltyCoins, setLoyaltyCoins] = useState(100); // Initial loyalty coins balance

  const handleRewardReceived = (rewardAmount) => {
    setLoyaltyCoins(loyaltyCoins + rewardAmount);
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="container">
          <div className=" row my-4 ">
            <div className=" col-12 col-md-12 col-lg-2"></div>
            <div className="col-12 col-md-8 col-lg-8 shadow px-4">
              <div className=" my-4">
                <h5 className="">Loyalty Coins Balance: {loyaltyCoins}</h5>
              </div>
              <div className="text-center">
                <img
                  src={rewardImage}
                  className="w-100 "
                  alt="Promotion Image"
                />
              </div>
              <div className="my-4">
                <div className="row">
                  <div className="col-10 col-md-10 col-lg-10">
                    <h6 className="">Recent Coin Activity</h6>
                  </div>
                  <div className="col-2 col-md-2 col-lg-2">
                    <h6 className="">Coins</h6>
                  </div>
                  <hr></hr>
                  {/* Display recent coin activity here */}
                </div>
                <div className="row">
                  <div className="col-10 col-md-10 col-lg-10">
                    <p className="mb-1">Expire Coins</p>
                    <p className="">Debited on 18 Aug 2023</p>
                  </div>
                  <div className="col-2 col-md-2 col-lg-2">
                    <h6 className="">-04</h6>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-10 col-md-10 col-lg-10">
                    <p className="mb-1">Latest Purchase</p>
                    <p className=" mb-0">Credited on 04 July 2022</p>
                  </div>
                  <div className="col-2 col-md-2 col-lg-2">
                    <h6 className="">+04</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
