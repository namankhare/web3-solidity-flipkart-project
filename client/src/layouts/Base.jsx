import Header from "../module/header/Header";
import profileImage from "../assets/img/user_pic.png";
import OrderHistory from "../module/orders/OrderHistory";
import "../assets/css/dashboard.css";
import Footer from "../module/footer/Footer";
import Navbar from "../module/header/Navbar";

const Base = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container-fluid">
        <div className="row shadow mt-3 ">
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

      {/* <div className="col-12 col-md-6 col-lg-8">
            <div className="shadow-sm hero-container">
              <div className="me-2  w-100 px-4">
                <div className="d-flex py-2">
                  <img
                    src={profileImage}
                    className="m-auto rounded-circle border border-3 border-white "
                    height="120"
                    width="120"
                    style="background: white"
                  />
                </div>
                <div className=" text-center">
                  <h6 className="text-center fw-bold mb-0">
                    Rashmi Prasad Roy
                  </h6>
                  <p className="text-center pt-0 mb-1">Age : 21</p>
                </div>
              </div>
            </div>
          </div> */}
      {/* <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-white shadow-sm">
              <div className="p-3 shadow-sm bg-white">
                <div className="">
                  <h5>Order History</h5>
                </div>
              </div>
            </div>
          </div> */}
      <Footer />
    </div>
  );
};

export default Base;
