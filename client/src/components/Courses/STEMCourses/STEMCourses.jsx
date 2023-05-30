import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const STEMCourses = ({ createdCourse }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/courses?category=STEM"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();

    // Add the created course to the courses state if it exists
    if (createdCourse) {
      setCourses((prevCourses) => [...prevCourses, createdCourse]);
    }
  }, [createdCourse]);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };
  const filteredCourses = courses.filter(
    (course) => course.category === "stem"
  );

  return (
    <div
      className="container"
      style={{ minHeight: "calc(100vh - 60px - 40px)" }}
    >
      <h2
        className="text-center"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        STEM Courses
      </h2>
      {filteredCourses.length > 0 ? (
        <div className="row">
          {filteredCourses.map((course) => (
            <div className="col-md-4" key={course._id}>
              <Card style={{ height: "100%" }}>
                <Card.Img
                  variant="top"
                  src={course.image}
                  alt={course.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  {course.description && (
                    <>
                      {course.description.length > 100 ? (
                        <>
                          <Card.Text>
                            {truncateDescription(course.description, 100)}
                          </Card.Text>
                          <Link to={`/coursedetail/${course._id}`}>
                            <Button variant="primary">Read More</Button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Card.Text>{course.description}</Card.Text>
                          <Link to={`/coursedetail/${course._id}`}>
                            <Button variant="primary">See Course</Button>
                          </Link>
                        </>
                      )}
                    </>
                  )}
                  {!course.description && <p>No description available.</p>}
                  <Button variant="success" style={{ margin: "10px" }}>
                    Enroll Now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Loading courses...</p>
      )}
    </div>
  );
};

export default STEMCourses;
