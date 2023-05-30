import React from "react";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import "./DashboardLayout.css";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <DashboardSidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
