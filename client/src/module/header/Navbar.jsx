import React from "react";
import defaultImage from "/vite.svg";
import userImage from "../../assets/img/user_pic.png";
import "../../../src/style.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light px-5 py-2"
        style={{ background: "#2874f0" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>
            <img
              src={defaultImage}
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            FlipShop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent "
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
              <li className="nav-item dropdown px-3">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Profie
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Loyalty Coins
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link " aria-current="page" href="#">
                  Become A Sellar
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="#">
                  Cart
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
