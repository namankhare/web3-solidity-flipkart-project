import { useEffect, useState } from "react";
import { styled } from "styled-components";
import apiClient from "../../helper/apiClient";
import { toast } from "react-hot-toast";

const partner_rewards = [
    {
        "reward_name": "OYO Discount",
        "discount_percentage": 20,
        "details": {
            "valid_until": "2023-12-31",
            "applicable_on": "All room types",
            "promo_code": "OYO20OFF"
        },
        "description": "Get a 20% discount on your OYO hotel bookings worldwide. Use promo code OYO20OFF during checkout.",
        "loyalty_coins_required": 25
    },
    {
        "reward_name": "Cleartrip Discount",
        "discount_percentage": 15,
        "details": {
            "valid_until": "2023-10-15",
            "applicable_on": "Domestic flights",
            "promo_code": "CT15FLY"
        },
        "description": "Enjoy 15% off on domestic flight bookings through Cleartrip. Use promo code CT15FLY before making your booking.",
        "loyalty_coins_required": 25

    },
    {
        "reward_name": "Cleartrip Discount",
        "discount_percentage": 15,
        "details": {
            "valid_until": "2023-10-15",
            "applicable_on": "Domestic flights",
            "promo_code": "CT15FLY"
        },
        "description": "Enjoy 15% off on domestic flight bookings through Cleartrip. Use promo code CT15FLY before making your booking.",
        "loyalty_coins_required": 25

    },
    {
        "reward_name": "Cleartrip Discount",
        "discount_percentage": 15,
        "details": {
            "valid_until": "2023-10-15",
            "applicable_on": "Domestic flights",
            "promo_code": "CT15FLY"
        },
        "description": "Enjoy 15% off on domestic flight bookings through Cleartrip. Use promo code CT15FLY before making your booking.",
        "loyalty_coins_required": 25

    },
    {
        "reward_name": "Cleartrip Discount",
        "discount_percentage": 15,
        "details": {
            "valid_until": "2023-10-15",
            "applicable_on": "Domestic flights",
            "promo_code": "CT15FLY"
        },
        "description": "Enjoy 15% off on domestic flight bookings through Cleartrip. Use promo code CT15FLY before making your booking.",
        "loyalty_coins_required": 25
    }
]

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: #000000c4;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: fixed;
`;
const Wrapper = styled.div`
  width: 40%;
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  z-index: 4;
  border-radius: 0.5rem;
  min-width: 355px;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;



const AvailableRewardsCard = () => {
    const [isRewardPopupVisible, setIsRewardPopupVisible] = useState(false);
    const [popupModalData, setPopupModalData] = useState([]);
    const [allRewardItems, setAllRewardItems] = useState([])
    useEffect(() => {
        apiClient.get(`/partner/getAllPartnerItems`)
            .then(({ data }) => {
                toast.success(data.message)
                setAllRewardItems(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const RewardPopupModal = () => {
        return (
            isRewardPopupVisible &&
            <Container>
                <Wrapper>
                    <div className="card-body">
                        <h2 className="card-title">{popupModalData.reward_name}</h2>
                        <p className="card-text">{popupModalData.description}</p>
                        <p className="card-text"><b>Loyalty Coins Required: {popupModalData.loyalty_coins_required}</b></p>

                        <h5 className="card-text"><b>About the offer: </b></h5>
                        <ul>
                            <li>
                                Valid Until: {new Date(popupModalData.details.valid_until).toDateString()}
                            </li>
                            <li>
                                Applicable On: {popupModalData.details.applicable_on}
                            </li>
                            <li>
                                Discount: {popupModalData.discount_percentage}% off
                            </li>
                        </ul>

                        <h5 className="card-text"><b>Key Terms & Conditions</b></h5>
                        <ul>
                            <li>
                                Discount applicable only on select products; check eligible products before claiming the Coupons
                            </li>
                            <li>
                                There will be no refunds of SuperCoins once Coupons is claimed
                            </li>
                            <li>
                                In case of part or full cancellation or return of the order, the discount and SuperCoins will be forfeited For more details, please refer T&Cs
                            </li>
                        </ul>

                        <button className='btn btn-warning'>Claim Offer</button>
                        <Close onClick={() => { setIsRewardPopupVisible(false) }}>
                            X
                        </Close>
                    </div>
                </Wrapper>
            </Container>
        )
    }
    return (
        <div className="row gap-2">
            <RewardPopupModal />
            {
                allRewardItems.length > 0 ?
                    allRewardItems.map((singleRewardCard) => {
                        return (
                            <div key={singleRewardCard._id} className="card" style={{ "width": "17rem" }}>
                                <img src={'https://placehold.co/400'} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{singleRewardCard.reward_name}</h5>
                                    <p className="card-text">Get {singleRewardCard.discount_percentage}% off</p>
                                    <a className="btn btn-primary" onClick={() => { setIsRewardPopupVisible(true); setPopupModalData(singleRewardCard) }}>View Offer</a>
                                </div>
                            </div>
                        )
                    }) : 'Opps! no rewards available right now!'
            }
        </div>
    )
}

export default AvailableRewardsCard