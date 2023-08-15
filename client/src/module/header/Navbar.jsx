import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-light bg-dark">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <span class="navbar-text">
            <img
              //   src={}
              alt=""
              srcSet=""
              className="border border-dark rounded-circle"
              width="30"
              height="30"
            />
          </span>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
