import React from "react";
import referralImage from "../../assets/img/refer_view.png";

const ViewReferral = () => {
  return (
    <div>
      <div class="d-flex border border-dark rounded-3 py-2 my-2 mx-0 px-0">
        <img
          src={referralImage}
          alt=""
          srcset=""
          height="40"
          class="my-auto ms-2 me-4"
        />
        <div>
          <h6 class="fw-bold ">View Referral</h6>
          <p class="mb-0">12</p>
        </div>
      </div>
    </div>
  );
};

export default ViewReferral;
