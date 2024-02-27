import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../src/layouts/backend/MainLayout";
import axios from "axios";

const AdminPrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/checkingAuthenticated`).then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
      }
      setLoading(false);
      return () => {
        setAuthenticated(false);
      };
    });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const isAuthenticated = authenticated;

  return isAuthenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace state={{ from: "/admin" }} />
  );
};

export default AdminPrivateRoute;
