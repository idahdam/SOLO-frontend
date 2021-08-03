import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <span className="buttonlogin" onClick={() => loginWithRedirect()}>
      Log In
    </span>
  );
};

export default LoginButton;
