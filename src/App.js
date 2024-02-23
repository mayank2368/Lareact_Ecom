import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/backend/MainLayout";
import Home from "./components/client/Home";
import Login from "./components/client/auth/Login";
import Register from "./components/client/auth/Register";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.headers.post["Content-type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application.json";
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<MainLayout />} />
          {/* Redirect should come after specific routes */}
          <Route
            path="*"
            element={<Navigate replace to="/admin/dashboard" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
