import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/backend/MainLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin/dashboard" element={<MainLayout />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
