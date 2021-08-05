import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import React from "react";
import "./index.css";

const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
const Admin = () => {
  const { isAuthenticated, user } = useAuth0();
  console.log(user);
  return (
    <>
      {isAuthenticated && user.email === adminEmail ? (
        <div className="admin-container">
          <div className="admin-container-title">Admin Page</div>
        </div>
      ) : (
        <>
          <Redirect to="/" />
        </>
      )}
    </>
  );
};

export default Admin;
