import React from "react";
import referralImage from "../../assets/img/refer_view.png";

const ViewReferral = ({ authUser }) => {
  return (
    <div>
      <div className="d-flex border border-dark rounded-3 py-2 my-2 mx-0 px-0">
        <img
          src={referralImage}
          alt=""
          height="40"
          className="my-auto ms-2 me-4"
        />
        <div>
          <h6 className="fw-bold ">Total Referral</h6>
          <p className="mb-0">{authUser.referredUsers.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewReferral;
