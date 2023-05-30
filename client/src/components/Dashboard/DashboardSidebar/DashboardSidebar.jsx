import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./DashboardSidebar.css";

const DashboardSidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="dashboard-sidebar"
      expanded={expanded}
      onToggle={toggleExpanded}
    >
      <Navbar.Toggle aria-controls="sidebar-nav" />
      <Navbar.Collapse id="sidebar-nav">
        <Nav className="flex-column">
          {" "}
          {/* Add the flex-column class here */}
          <Nav.Link as={Link} to="/dashboard" className="sidebar-link">
            <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/account" className="sidebar-link">
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            Account
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/settings" className="sidebar-link">
            <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
            Settings
          </Nav.Link>
          <Nav.Link as={Link} to="/logout" className="sidebar-link">
            <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DashboardSidebar;
