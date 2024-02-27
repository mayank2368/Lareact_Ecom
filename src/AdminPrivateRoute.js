import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AdminPrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/checkingAuthenticated")
      .then((response) => {
        if (response.status === 200) {
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminPrivateRoute;
