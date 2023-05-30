import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const LanguagesCourses = ({ createdCourse }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/courses?category=Languages"
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
    (course) => course.category === "languages"
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
        Language Courses
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
                  <Card.Text>
                    {truncateDescription(course.description, 100)}
                  </Card.Text>
                  {course.description.length > 0 && (
                    <Link to={`/coursedetail/${course._id}`}>
                      <Button variant="primary">Read More</Button>
                    </Link>
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
        <p className="text-center">No language courses available.</p>
      )}
    </div>
  );
};

export default LanguagesCourses;
