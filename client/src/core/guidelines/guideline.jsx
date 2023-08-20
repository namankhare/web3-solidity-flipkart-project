import Navbar from "../../module/header/Navbar";
import loyaltyCoinImage from "../../assets/img/rewards.png";
import Footer from "../../module/footer/Footer";

const guideline = () => {
  const fontColor = {
    color: "#878787",
    fontSize: "small",
  };
  const paraSize = {
    fontSize: "small",
  };
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="container">
          <div className="row mt-2">
            <div className="col-lg-3"></div>
            <div
              className="col-lg-6 shadow-sm py-3"
              style={{ background: "#f1f3f6" }}
            >
              <div className="text-center">
                <img
                  src={loyaltyCoinImage}
                  className="w-100"
                  alt="Promotion Image"
                />
              </div>
              <div className="">
                <ul
                  className="py-3"
                  style={{
                    fontSize: "small",
                  }}
                >
                  <li>
                    <p>
                      LoyaltyCoins is a type of system that rewards its
                      customers for every purchase they make on FlipShop. Earn
                      LoyaltyCoins from FlipShop by just placing one order.
                    </p>
                  </li>
                  <li>
                    <p>
                      You can earn 2 LoyaltyCoins for every 100 rupees that you
                      spend on FlipShop. The earned LoyaltyCoins will be
                      credited to your account after the return period of the
                      item is over.
                    </p>
                  </li>
                  <li>
                    <p>
                      Overall you can avail maximum of 50 coins per order
                      whatever the price is.So the limit would be 50 coins per
                      order.
                    </p>
                  </li>
                  <li>
                    <p>
                      You earn LoyaltyCoins by shopping on FlipShop and with
                      brand partners such as Ola, Urban Clap, OYO, 1 MG and more
                      through FlipShop. Therefore, A seller can set upto 2-3 %
                      of the maximum price for their LoyaltyCoins
                    </p>
                  </li>
                </ul>
              </div>
              <div className="px-3">
                <h5 className="fw-bold">Some Frequently Asked Questions</h5>
                <p className="mt-3 mb-0 fw-bold" style={paraSize}>
                  Q. Where can I check my LoyaltyCoins?
                </p>
                <p className="mt-0" style={fontColor}>
                  A. You can check the Rewards Section where your total coins
                  are mentioned.
                </p>
                <p className="mt-3 mb-0 fw-bold" style={paraSize}>
                  Q. How to use LoyaltyCoins?
                </p>
                <p className="mt-0" style={fontColor}>
                  A. You can buy coupons and EVGs using LoyaltyCoins and use
                  them for buying any product.
                </p>
                <p className="mt-3 mb-0 fw-bold" style={paraSize}>
                  Q. What is the validity of coins?
                </p>
                <p className="mt-0" style={fontColor}>
                  A. The coins will expire after one year from the date of
                  credit.
                </p>
                <p className="mt-3 mb-0 fw-bold" style={paraSize}>
                  Q. When will the coins be credited??
                </p>
                <p className="mt-0" style={fontColor}>
                  A. Coins will be credited once the Return Policy period of all
                  items in your order is completed.In case od travel/hotel
                  bookings, the Loyaltycoins will be creditedstate once the
                  booking date has passed.
                </p>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
      <hr />
      <p className="py-2 px-2" style={{ fontSize: "small", color: "#878787" }}>
        Everyone loves earning rewards in some form or the other. Be it at work,
        while purchasing items in a store, swiping a credit card, and more. So,
        why should you not get rewarded when you buy items on FlipShop? FlipShop
        LoyaltyCoins is a type of system that rewards its customers for every
        purchase they make on FlipShop. When you use LoyaltyCoins brand
        partners, such as Urban Company, OYO, and more. You can earn 2
        LoyaltyCoins for every 100 rupees that you spend on FlipShop. The earned
        LoyaltyCoins will be credited to your account after the return period of
        the item is over. So, are you wondering how to use LoyaltyCoins in
        FlipShop? You can use the earned FlipShop Coins to pay for the products
        that you buy on FlipShop. The FAQs on the FlipShop LoyaltyCoins page
        will help you find answers to questions, such as “How to use FlipShop
        LoyaltyCoins?”, “When will LoyaltyCoins be credited?”, "Where can I
        check my LoyaltyCoins balance?”, and more. You earn LoyaltyCoins by
        shopping on FlipShop and with brand partners such as Ola, Urban Clap,
        OYO, 1 MG and more through FlipShop. Use your LoyaltyCoins to buy gift
        vouchers, membership on Gaana, Zomato, Book My Show and more and buy
        products on FlipShop starting from 1 Rupee. Check Now!
      </p>
      <Footer />
    </div>
  );
};

export default guideline;
