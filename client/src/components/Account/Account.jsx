import React, { useState } from "react";
import {
  Card,
  ListGroup,
  Button,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import defaultProfilePicture from "../../assets/images/default-profile-picture.png";
import DashboardSidebar from "../Dashboard/DashboardSidebar/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} className="sidebar fixed-sidebar">
          <DashboardSidebar />
        </Col>
        <Col md={9} className="main-content">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

const Account = ({ student }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);

  const studentData = {
    name: "John Doe",
    email: "johndoe@example.com",
    studentID: "123456",
    enrollmentStatus: "Enrolled",
    gradeLevel: "5th Grade",
    // Add more student details if available
  };

  const { name, email, studentID, enrollmentStatus, gradeLevel } = studentData; // eslint-disable-line no-unused-vars

  const handleEditButtonClick = () => {
    setEditMode(true);
    setEditedName(name);
    setEditedEmail(email);
  };

  const handleProfilePictureChange = (e) => {
    setSelectedProfilePicture(e.target.files[0]);
  };

  const handleSaveChanges = () => {
    // Perform the save action here (e.g., send updated data to the server)
    // Update the studentData state with the edited values
    studentData.name = editedName;
    studentData.email = editedEmail;

    // Exit edit mode
    setEditMode(false);
  };

  return (
    <DashboardLayout>
      <div className="account-wrapper">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <Card style={{ width: "500px" }}>
            <Card.Title className="text-center mt-3">My Account</Card.Title>
            <Card.Img
              variant="top"
              src={
                selectedProfilePicture
                  ? URL.createObjectURL(selectedProfilePicture)
                  : defaultProfilePicture
              }
              className="rounded-circle"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                margin: "auto",
                marginTop: "10px",
                borderRadius: "50%",
              }}
            />
            <Card.Body>
              {editMode ? (
                <>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group style={{ marginBottom: "20px" }}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group style={{ marginBottom: "20px" }}>
                    <Form.Label>Select Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </Form.Group>
                  {selectedProfilePicture && (
                    <img
                      src={URL.createObjectURL(selectedProfilePicture)}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        margin: "auto",
                        marginTop: "10px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Card.Title>{name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item style={{ marginBottom: "20px" }}>
                      <strong>Email:</strong> {email}
                    </ListGroup.Item>
                    {/* Add more student details here */}
                  </ListGroup>
                  <Button variant="primary" onClick={handleEditButtonClick}>
                    Edit
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Account;
