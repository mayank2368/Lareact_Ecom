import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../src/layouts/backend/MainLayout";

const AdminPrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("auth_token");

  return isAuthenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace state={{ from: "/admin" }} />
  );
};

export default AdminPrivateRoute;
