import { useEffect, useState } from "react";
import Header from "../../module/header/Header"
import Navbar from "../../module/header/Navbar"
import apiClient from "../../helper/apiClient";
import { Link } from "react-router-dom";

const ClaimedRewards = () => {
    const [claimedCoupons, setClaimedCoupons] = useState([])
    useEffect(() => {
        apiClient.get(`/user/getUser`)
            .then(({ data }) => {
                setClaimedCoupons(data.data.ClaimedCoupon);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])
    return (
        <div>
            <Header />
            <Navbar />
            <div className="container-fluid">
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 col-md-8 col-lg-8 shadow px-4 m-auto bg-white">
                            <div className="my-4">
                                <Link className="btn btn-outline-dark mb-4" to="/flpzone">
                                    Go Back
                                </Link>
                                <h4 className="">Claimed Rewards</h4>
                                <table className="table mt-4">
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Reward Name</th>
                                            <th>Reward Description</th>
                                            <th>Coupon Code</th>
                                            <th>Valid Until</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claimedCoupons && claimedCoupons.length > 0 ? (
                                            claimedCoupons.map((singleCoupon, index) => (
                                                <tr key={singleCoupon._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{singleCoupon.reward_name}</td>
                                                    <td>{singleCoupon.description}</td>
                                                    <td>{singleCoupon.couponCode}</td>
                                                    <td>{new Date(singleCoupon.validUntil).toDateString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">Nothing Claimed Yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ClaimedRewards