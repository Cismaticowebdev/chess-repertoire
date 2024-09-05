import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ component: Component, isPrivate }) => {
  const { user } = useAuth();

  if (isPrivate && !user) {
    // Redirect to login if the route is private and the user is not authenticated
    return <Navigate to="/login" />;
  }

  if (!isPrivate && user) {
    // Redirect to home if the route is public and the user is authenticated
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
