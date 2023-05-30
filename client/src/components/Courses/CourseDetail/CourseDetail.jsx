import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./CourseDetail.css"; // Import the CSS file

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0); // Track the current module index

  useEffect(() => {
    fetch(`http://localhost:3001/course/${id}`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleNextModule = () => {
    setCurrentModuleIndex((prevIndex) => prevIndex + 1); // Increment the current module index
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const currentModule = course.modules[currentModuleIndex];

  const getVideoId = (url) => {
    // Function to extract video ID from YouTube URL
    const videoIdRegex =
      /(?:\?v=|\/embed\/|\.be\/|\/v\/|\/\d{1,2}\/|\/embed\/|\.be\/|\/v\/|\/\d{1,2}\/|youtu\.be\/|embed\/|\/v\/|\/e\/|watch\?v=|&v=)([^#&?]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  };

  return (
    <div className="course-detail">
      <div className="course-detail-content">
        <h2 className="course-title">{course.title}</h2>
        <h3 className="teacher-info">Taught by : {course.teacher}</h3>
        <div className="course-video">
          <iframe
            src={`https://www.youtube.com/embed/${getVideoId(
              currentModule.video
            )}`}
            title={currentModule.title}
            allowFullScreen
          ></iframe>
        </div>
        <div className="module-card">
          <h4>Module {currentModuleIndex + 1}</h4>
          <h5>{currentModule.title}</h5>
          <p>{currentModule.description}</p>
        </div>
        {currentModuleIndex < course.modules.length - 1 && (
          <Button variant="primary" onClick={handleNextModule}>
            Next Module
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
