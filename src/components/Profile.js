import React from "react";
import { getInitials } from "../utils/helper";
import "../styles/Profile.css"

const Profile = ({ userInfo }) => {
  return (
    userInfo && (
      <div className="profile-container">
        <div className="user-container">
          <div className="profile-logo">{getInitials(userInfo?.fullName)}</div>
          <p className="profile-name">{userInfo.fullName}</p>
        </div>
      </div>
    )
  );
};

export default Profile;
