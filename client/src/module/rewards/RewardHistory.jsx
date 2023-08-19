import React from "react";
import rewardImage from "../../assets/img/reward.png";

// view add delete
const RewardHistory = () => {
  return (
    <div>
      <div class="d-flex border border-dark rounded-3 py-2 my-2 mx-0 px-0">
        <img
          src={rewardImage}
          alt=""
          srcset=""
          height="40"
          class="my-auto ms-2 me-4"
        />
        <div>
          <h6 class="fw-bold ">Total Rewards </h6>
          <p class="mb-0">41</p>
        </div>
      </div>
    </div>
  );
};

export default RewardHistory;
