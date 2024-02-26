import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal({
            text: res.data.message,
            icon: "success",
            buttons: false,
            timer: 2000,
          }).then(() => {
            navigate("/");
          });
        } else if (res.data.status === 401) {
          swal("Unauthorized", "Your email or password is incorrect.", "error");
        } else {
          setLoginInput({
            ...loginInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Login</h4>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label>Email ID</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email id"
                        className="form-control"
                        onChange={handleInput}
                        value={loginInput.email}
                      />
                      <span style={{ color: "red" }}>
                        {loginInput.error_list.email}
                      </span>
                    </div>
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="form-control"
                        onChange={handleInput}
                        value={loginInput.password}
                      />
                      <span style={{ color: "red" }}>
                        {loginInput.error_list.password}
                      </span>
                    </div>
                    <div className="form-group mb-3">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
