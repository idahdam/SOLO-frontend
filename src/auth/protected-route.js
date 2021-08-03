import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { AdminNotLoggedIn } from "../components/";

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <AdminNotLoggedIn />,
    })}
    {...args}
  />
);

export default ProtectedRoute;
