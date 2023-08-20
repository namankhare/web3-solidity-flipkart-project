import React from "react";
import logo from "/vite.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const paraSize = {
    fontSize: "small",
  };
  const social = {
    background: "#01b8e9",
    borderRadius: "50%",
    color: "white",
    height: "30px",
    width: "30px",
    textDecoration: "none",
  };
  return (
    <>
      <div className="container-fluid " style={{ background: "#172337" }}>
        <div className="container">
          <div className="row p-2">
            <div className="col-lg-3 col-sm-12 col-md-4 d-flex flex-column my-2 box">
              <div className="my-2">
                <a href="">
                  <img height={40} src={logo} alt="" />
                </a>
              </div>
              <div className="my-1 text-white">
                <h6 style={paraSize}>Copyright © FlipShop, 2023.</h6>
                <h6 style={paraSize}>All Rights Reserved.</h6>
              </div>
              <div className="my-1 text-left d-flex align-items-center w-50 justify-content-between">
                <a
                  className="d-flex justify-content-center align-items-center"
                  href="/"
                  style={social}
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  className="d-flex justify-content-center align-items-center"
                  href="/"
                  style={social}
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  className="d-flex justify-content-center align-items-center"
                  href="/"
                  style={social}
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a
                  className="d-flex justify-content-center align-items-center "
                  href="/"
                  style={social}
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-12 col-md-4 d-flex justify-content-center align-items-center my-2">
              <div className="col-lg-4 d-lg-flex align-items-center flex-column">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      FlipShop Stories
                    </Link>
                  </li>
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      Press
                    </Link>
                  </li>
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      Corporate Info
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-12 col-md-4 d-flex justify-content-center align-items-center my-2">
              <div className="d-flex flex-column justify-content-evenly align-items-center w-100">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      Payments
                    </Link>
                  </li>
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      Shipping
                    </Link>
                  </li>
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      Cancellation
                    </Link>
                  </li>
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      Return
                    </Link>
                  </li>
                  <li className="nav-item mb-2 box">
                    <Link
                      to="/guidelines"
                      className="nav-link p-0 text-white"
                      style={{ minWidth: "120px" }}
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-12 col-md-4 d-flex justify-content-center align-items-center my-2 flex-grow-1">
              <div className="d-flex flex-column justify-content-evenly align-items-center w-100">
                <span className="my-2 text-white  " style={paraSize}>
                  FlipShop Internet Private Limited, Buildings Alyssa, Begonia &
                  Clove Embassy Tech Village, Outer Ring Road,
                  Devarabeesanahalli Village, Bengaluru, 560103, Karnataka,
                  India CIN : U51109KA2012PTC066107
                  <ul className="nav flex-column">
                    <li className="nav-item mb-2 box">
                      <a
                        href="/"
                        className="nav-link p-0 text-white"
                        style={{ minWidth: "120px" }}
                      >
                        Telephone: 044-45614700
                      </a>
                    </li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
