// not used
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ user }) => {
  console.log("@@user", user);
  return user?.email ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
