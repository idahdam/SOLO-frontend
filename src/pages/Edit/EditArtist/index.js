import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

const { REACT_APP_ADMIN_EMAIL } = process.env;
const adminEmail = REACT_APP_ADMIN_EMAIL;
const EditArtist = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <>
      {isAuthenticated && user.email === adminEmail ? (
        <div className="edit-container">ARTIST PAGE</div>
      ) : (
        <>
          <Redirect to="/" />
        </>
      )}
    </>
  );
};

export default EditArtist;
