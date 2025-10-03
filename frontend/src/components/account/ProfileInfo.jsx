// components/account/ProfileInfo.jsx
import React from "react";

const ProfileInfo = ({ user }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Account Details</h3>
      <p><strong>Profile Image:</strong> <img src={user.profileImage}></img> </p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Full Name: </strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default ProfileInfo;
