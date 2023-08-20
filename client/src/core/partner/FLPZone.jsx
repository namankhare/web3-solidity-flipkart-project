import { useContext, useEffect, useState } from "react";
import Header from "../../module/header/Header";
import Navbar from "../../module/header/Navbar";
import { GlobalContext } from "../../context/GlobalContext";
import apiClient from "../../helper/apiClient";
import rewardImage from "../../assets/img/rewards.png";
import AvailableRewardsCard from "../../module/partner/AvailableRewardsCard";

const FLPZone = () => {
    const { walletAddress } = useContext(GlobalContext);
    const [loyaltyCoins, setLoyaltyCoins] = useState(0); // Initial loyalty coins balance

    useEffect(() => {
        if (walletAddress === "") {
            return;
        }
        apiClient
            .get(`/web3/getuserpoints`, { params: { wallet: walletAddress } })
            .then(({ data }) => {
                setLoyaltyCoins(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [walletAddress]);

    const FLCZone = () => {
        return (
            <div className="col-12 col-md-8 col-lg-8 shadow px-4 m-auto">
                <div className=" my-4">
                    <h5 className="">Loyalty Coins Balance: {loyaltyCoins}</h5>
                </div>
                <div className="text-left">
                    <button className="btn btn-outline-primary">View Coin Activity</button>
                </div>
                <div className="my-4">
                    <div className="row">
                        <div className="col-8">
                            <h6 className="">Exciting Rewards for You:</h6>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-outline-success m-auto">View Claimed Rewards</button>
                        </div>
                        <hr className="my-2" />
                    </div>
                </div>
                <div className="my-4">
                    <div className="row">
                        <div className="col-12">
                            <AvailableRewardsCard />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Header />
            <Navbar />
            <div className="container-fluid">
                <div className="container">
                    <div className=" row my-4 ">
                        {walletAddress ? (
                            <FLCZone />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FLPZone;
