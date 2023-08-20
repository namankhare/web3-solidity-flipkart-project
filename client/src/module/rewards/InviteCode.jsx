import React from "react";
import inviteCode from "../../assets/img/invite.png";

const InviteCode = ({ authUser }) => {
  return (
    <div>
      <div className="d-flex border border-dark rounded-3 py-2 my-2 mx-0 px-0">
        <img
          src={inviteCode}
          alt=""
          height="40"
          className="my-auto ms-2 me-4"
        />
        <div>
          <h6 className="fw-bold ">Invite Code </h6>
          <p className="mb-0">{authUser.username}</p>
        </div>
      </div>
    </div>
  );
};

export default InviteCode;
