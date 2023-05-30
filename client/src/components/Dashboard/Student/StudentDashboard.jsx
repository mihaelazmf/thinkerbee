import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get("/courses/enrolled");
      setEnrolledCourses(response.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

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
            <Card.Body>
              <Card.Title>Enrolled Courses</Card.Title>
              <ul>
                {enrolledCourses.map((course) => (
                  <li key={course._id}>{course.name}</li>
                ))}
              </ul>
            </Card.Body>
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
      <Outlet /> {/* Render nested routes */}
    </Container>
  );
};

export default StudentDashboard;
