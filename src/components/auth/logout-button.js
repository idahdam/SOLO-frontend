import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles.css";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <span
      className="buttonlogout"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </span>
  );
};

export default LogoutButton;
