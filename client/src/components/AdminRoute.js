import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({ component: Component, ...rest }) {
  const { isAdmin } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAdmin ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}
