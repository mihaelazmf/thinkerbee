import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CourseList from "../../Courses/CourseList/CourseList";
import CourseCreation from "./TeacherCourses/CourseCreation/CourseCreation";

import "./TeacherDashboard.css";
import "../../../assets/themes/theme.css";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showCourseCreation, setShowCourseCreation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3001/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const handleNavigateToCourseMain = () => {
    navigate("/coursesmain"); // Navigate to the Course List page
  };

  const handleNavigateToCourseCreation = () => {
    setShowCourseCreation(true);
  };

  const handleCancelCourseCreation = () => {
    setShowCourseCreation(false);
  };

  return (
    <div className="teacher-dashboard">
      <h2 className="dashboard-heading" style={{ margin: "20px" }}>
        Welcome, Teacher
      </h2>

      <div className="dashboard-section">
        <h3 style={{ margin: "20px" }}>Create a New Course</h3>
        {showCourseCreation ? (
          <CourseCreation onCancel={handleCancelCourseCreation} />
        ) : (
          <>
            <p style={{ margin: "20px" }}>
              Click the button below to create a new course:
            </p>
            <button
              className="button"
              onClick={handleNavigateToCourseCreation}
              style={{ margin: "20px" }}
            >
              Create Course
            </button>
          </>
        )}
      </div>

      <div className="dashboard-section">
        <h3 style={{ margin: "20px" }}>Existing Courses</h3>
        <CourseList courses={courses} />
      </div>

      <button
        style={{ margin: "20px" }}
        className="button"
        onClick={handleNavigateToCourseMain}
      >
        Go to Course List
      </button>
    </div>
  );
};

export default TeacherDashboard;
