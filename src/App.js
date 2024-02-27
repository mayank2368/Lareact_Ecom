import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/client/Home";
import Login from "./components/client/auth/Login";
import Register from "./components/client/auth/Register";
import axios from "axios";
import AdminPrivateRoute from "./AdminPrivateRoute";
import MainLayout from "./layouts/backend/MainLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";

function App() {
  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.headers.post["Content-type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
  axios.interceptors.request.use(function (config) {
    config.headers = config.headers || {};
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Admin Routes */}
          <Route path="/admin/*" element={<AdminPrivateRoute />}>
            <Route path="" element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Redirect for any unmatched route */}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
