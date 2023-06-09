import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the courses from the server
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      // Make the API request to delete the course
      await axios.delete(`http://localhost:3001/courses/${courseId}`);

      // Remove the deleted course from the courses list
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );

      console.log("Course deleted successfully");
    } catch (error) {
      console.error("Failed to delete course:", error);
      // Handle the error accordingly
    }
  };

  return (
    <div style={{ padding: "20px", marginBottom: "20px" }}>
      <h3>Course List</h3>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="card-container">
          {courses.map((course) => (
            <Card key={course._id} className="course-card">
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCourse(course._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
