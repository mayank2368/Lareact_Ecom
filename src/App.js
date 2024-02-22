import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/backend/MainLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin/*" element={<MainLayout />} />
          {/* Redirect from base URL to /admin/dashboard */}
          <Route
            path="/"
            element={<Navigate replace to="/admin/dashboard" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
