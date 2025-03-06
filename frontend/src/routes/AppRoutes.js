import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import CustomerRegister from "../pages/CustomerRegister";
import AdminRegister from "../pages/AdminRegister";
import AdminLogin from "../pages/AdminLogin";  
import AdminDashboard from "../pages/AdminDashboard";
// import PrivateRoute from "./PrivateRoute";
import VerifyEmail from "../pages/VerifyEmail";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer-register" element={<CustomerRegister />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/admin-login" element={<AdminLogin />} />  
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* <Route element={<PrivateRoute />}> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      {/* </Route> */}
    </Routes>
  );
};

export default AppRoutes;
