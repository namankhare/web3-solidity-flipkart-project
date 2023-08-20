import { useContext, useEffect, useState } from "react";
import Navbar from "../../module/header/Navbar";
import Footer from "../../module/footer/Footer";
import "../../assets/css/dashboard.css";
import rewardImage from "../../assets/img/rewards.png";
import apiClient from "../../helper/apiClient";
import { GlobalContext } from "../../context/GlobalContext";
import { convertFromWei, timestamptoDate } from "../../helper/helpFunc";

const Reward = () => {
  const [loyaltyCoins, setLoyaltyCoins] = useState(0); // Initial loyalty coins balance
  const [pointsHistory, setPointsHistory] = useState(''); // Initial loyalty coins balance
  const { walletAddress } = useContext(GlobalContext);

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

  const sortedPointsHistory = pointsHistory && pointsHistory
    .slice()
    .sort((a, b) => b[0] - a[0]) // Sort by the first element (singleHistory[0]) in descending order


  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="container">
          <div className=" row my-4 ">
            {
              (walletAddress) ?
                <div className="col-12 col-md-8 col-lg-8 shadow px-4 m-auto bg-white">
                  <div className="my-4">
                    <h5 className="">Loyalty Coins Balance: {loyaltyCoins}</h5>
                  </div>
                  <div className="text-center">
                    <img
                      src={rewardImage}
                      className="w-100 "
                      alt="Promotion Image"
                    />
                  </div>
                  <div className="row mt-4">
                    <div className="col-10 col-md-10 col-lg-10">
                      <h6 className="">Coin Activity</h6>
                    </div>
                    <div className="col-2 col-md-2 col-lg-2">
                      <h6 className="">Coins</h6>
                    </div>
                    <hr></hr>
                    {/* Display recent coin activity here */}
                  </div>
                  <div className="vh-100 overflow-auto border border-1 p-2">
                    {/* loop */}
                    {
                      sortedPointsHistory ?
                        sortedPointsHistory.map((singleHistory) => {
                          let data = {}
                          if (singleHistory[4] === "earn") {
                            data = {
                              name: <p className="">Credit of {singleHistory[2]}</p>,
                              amount: <p className="text-success fs-small">+ {convertFromWei(singleHistory[3])}</p>,
                              date: <p className="text-secondary"><small>Credited on {timestamptoDate(singleHistory[5])}</small></p>
                            }
                          } else if (singleHistory[4] === "redeem") {
                            data = {
                              name: <p className="">Redemption of {singleHistory[2]}</p>,
                              amount: <p className="text-danger">- {convertFromWei(singleHistory[3])}</p>,
                              date: <p className="text-secondary"><small>Debited on {timestamptoDate(singleHistory[5])}</small></p>
                            }
                          } else if (singleHistory[4] === "expire") {
                            data = {
                              name: "Expired Coins",
                              amount: <p className="text-danger">- {convertFromWei(singleHistory[3])}</p>,
                              date: <p className="text-secondary"><small>Expired on {timestamptoDate(singleHistory[5])}</small></p>
                            }
                          }
                          return (
                            <div key={singleHistory[0]} className="row">
                              <div className="col-10 col-md-10 col-lg-10">
                                {data.name}
                                {data.date}
                              </div>
                              <div className="col-2 col-md-2 col-lg-2">
                                <h6 className="">{data.amount}</h6>
                              </div>
                              <hr />
                            </div>
                          )
                        }) : 'Loading.. Please Wait!'
                    }
                    {/* loop end */}
                  </div>
                </div>
                : <>Please Connect Your Digital Wallet</>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reward;
