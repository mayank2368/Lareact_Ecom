import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    axios
      .post(`/api/logout`)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_name");
          swal({
            text: res.data.message,
            icon: "success",
            buttons: false,
            timer: 2000,
          }).then(() => {
            navigate("/");
          });
        } else {
          console.error("Logout failed", res.data);
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        swal({
          title: "Error",
          text: "Something went wrong during logout.",
          icon: "error",
          button: true,
        });
      });
  };

  var AuthButtons = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </>
    );
  } else {
    AuthButtons = (
      <li className="nav-item">
        <button
          type="button"
          className="nav-link btn btn-danger btn-sm text-white"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </li>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Collection
              </Link>
            </li>
            {AuthButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
