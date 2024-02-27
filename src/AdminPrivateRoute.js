import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const AdminPrivateRoute = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated
    axios
      .get("/api/checkingAuthenticated")
      .then((response) => {
        if (response.status === 200) {
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          swal({
            text: "You are not authorized to access this page.",
            icon: "warning",
            button: false,
            timer: 2000,
          }).then(() => {
            navigate("/login");
          });
        }
        return Promise.resolve(error);
      }
    );

    // Cleanup the interceptor when the component unmounts
  }, [navigate]);

  if (loading) return <h1>Loading...</h1>;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminPrivateRoute;
