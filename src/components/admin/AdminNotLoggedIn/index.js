import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./index.css";

const AdminNotLoggedIn = () => {
  return (
    <div className="loader-pos">
      <ClipLoader loading={true} size={150} />
    </div>
  );
};

export default AdminNotLoggedIn;
