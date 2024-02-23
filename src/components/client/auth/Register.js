import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    error_list: {},
  });

  const handleChange = (e) => {
    e.persist();
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message);
          navigate("/");
        } else {
          setRegisterInput({
            ...registerInput,
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
                <h4>Register</h4>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        onChange={handleChange}
                        value={registerInput.name}
                        className="form-control"
                      />
                      <span>{registerInput.error_list.name}</span>
                    </div>
                    <div className="form-group mb-3">
                      <label>Email ID</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email id"
                        onChange={handleChange}
                        value={registerInput.email}
                        className="form-control"
                      />
                      <span>{registerInput.error_list.email}</span>
                    </div>
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your desired password"
                        onChange={handleChange}
                        value={registerInput.password}
                        className="form-control"
                      />
                      <span>{registerInput.error_list.password}</span>
                    </div>
                    {/* <div className="form-group mb-3">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirm-password"
                        placeholder="Re-enter your desired password"
                        onChange={handleChange}
                        value={registerInput.password}
                        className="form-control"
                      />
                      <span>{registerInput.error_list.password}</span>
                    </div> */}
                    <div className="form-group mb-3">
                      <button type="submit" className="btn btn-primary">
                        Register
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

export default Register;
