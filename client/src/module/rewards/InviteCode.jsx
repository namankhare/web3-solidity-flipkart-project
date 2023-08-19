import React from "react";
import inviteCode from "../../assets/img/invite.png";

const InviteCode = () => {
  return (
    <div>
      <div class="d-flex border border-dark rounded-3 py-2 my-2 mx-0 px-0">
        <img
          src={inviteCode}
          alt=""
          srcset=""
          height="40"
          class="my-auto ms-2 me-4"
        />
        <div>
          <h6 class="fw-bold ">Invite Code </h6>
          <p class="mb-0">rashmi@23</p>
        </div>
      </div>
    </div>
  );
};

export default InviteCode;
