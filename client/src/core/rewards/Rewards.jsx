import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../module/header/Navbar";
import Footer from "../../module/footer/Footer";
import "../../assets/css/dashboard.css";
import rewardImage from "../../assets/img/rewards.png";
import apiClient from "../../helper/apiClient";
import { GlobalContext } from "../../context/GlobalContext";
import { timestamptoDate } from "../../helper/helpFunc";

const Reward = () => {
  const [loyaltyCoins, setLoyaltyCoins] = useState(0); // Initial loyalty coins balance
  const [pointsHistory, setPointsHistory] = useState(''); // Initial loyalty coins balance
  const { walletAddress } = useContext(GlobalContext);

  const handleRewardReceived = (rewardAmount) => {
    setLoyaltyCoins(loyaltyCoins + rewardAmount);
  };

  useEffect(() => {
    if (walletAddress === '') {
      return;
    }
    apiClient.get(`/web3/getuserpoints`, { params: { wallet: walletAddress } })
      .then(({ data }) => {
        setLoyaltyCoins(data.data)
      })
      .catch((err) => {
        console.log(err);
      })
    apiClient.get(`/web3/getpointshistory`, { params: { wallet: walletAddress } })
      .then(({ data }) => {
        setPointsHistory(data.data)
      })
      .catch((err) => {
        console.log(err);
      })


  }, [walletAddress])


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
                {/* loop */}
                {
                  pointsHistory &&
                  pointsHistory.map((singleHistory, index) => {
                    let data = {}
                    if (singleHistory[2] === "earn") {
                      data = {
                        name: singleHistory[2],
                        amount: singleHistory[1],
                        date: `Credited on ${timestamptoDate(singleHistory[3])}`
                      }
                    } else if (singleHistory[2] === "redeem") {
                      data = {
                        name: singleHistory[2],
                        amount: singleHistory[1],
                        date: `Debited on ${timestamptoDate(singleHistory[3])}`
                      }
                    } else if (singleHistory[2] === "expire") {
                      data = {
                        name: "Expired Coins",
                        amount: singleHistory[1],
                        date: `Expired on ${timestamptoDate(singleHistory[3])}`
                      }
                    }
                    return (
                      <div key={singleHistory[0]} className="row">
                        <div className="col-10 col-md-10 col-lg-10">
                          <p className="mb-1">{data.name}</p>
                          <p className="">{data.date}</p>
                        </div>
                        <div className="col-2 col-md-2 col-lg-2">
                          <h6 className="">{data.amount}</h6>
                        </div>
                      </div>
                    )
                  })
                }
                {/* <div className="row">
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
                </div> */}
                {/* loop end */}
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-2"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reward;
