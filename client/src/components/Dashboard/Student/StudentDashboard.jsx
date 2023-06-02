import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <Container className="student-dashboard">
      <h2 style={{ color: "#007bff", fontSize: "24px", marginBottom: "10px" }}>
        Welcome, Student!
      </h2>
      <p style={{ fontSize: "16px" }}>
        This is your student dashboard. Here are some features you can include:
      </p>
      <Row>
        <Col>
          <Card>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Assignments</Card.Title>
              {/* Add content for displaying upcoming assignments */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
