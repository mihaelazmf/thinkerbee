import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Account from "../../Account/Account";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation();

  return (
    <Container fluid className="dashboard-container">
      <Row>
        <Col md={3} className="sidebar">
          <DashboardSidebar />
        </Col>
        <Col md={9} className="main-content">
          <div className="dashboard-content">
            <Routes location={location}>
              <Route path="/dashboard/account" element={<Account />} />
              {/* Add more routes for additional dashboard components */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
