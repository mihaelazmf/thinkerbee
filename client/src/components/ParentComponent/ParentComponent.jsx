import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout/Layout";
import TeacherDashboard from "./Dashboard/Teacher/TeacherDashboard";

const ParentComponent = () => {
  return (
    <Layout>
      <TeacherDashboard />
      <Outlet />
    </Layout>
  );
};

export default ParentComponent;
