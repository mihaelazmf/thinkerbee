import React, { useState } from "react";
import axios from "axios";
import "./CourseCreation.css";
import { Card, Button } from "react-bootstrap";

const CourseCreation = ({ onCourseCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [teacher, setTeacher] = useState("");
  const [modules, setModules] = useState([
    {
      title: "",
      description: "",
      video: "",
    },
  ]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [createdCourse, setCreatedCourse] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
    setCreatedCourse(null);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleTeacherChange = (e) => {
    setTeacher(e.target.value);
  };

  const handleModuleChange = (e) => {
    const updatedModules = [...modules];
    updatedModules[currentModuleIndex][e.target.name] = e.target.value;
    setModules(updatedModules);
  };

  const handleAddModule = () => {
    const updatedModules = [...modules];
    updatedModules.push({
      title: "",
      description: "",
      video: "",
    });
    setModules(updatedModules);
    setCurrentModuleIndex(updatedModules.length - 1);
  };

  const handleResetForm = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setTeacher("");
    setCategory("");
    setModules([
      {
        title: "",
        description: "",
        video: "",
      },
    ]);
    setCurrentModuleIndex(0);
    setShowSuccessMessage(false);
    setCreatedCourse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!modules[currentModuleIndex].video) {
      console.error("Module video URL is required");
      return;
    }

    // Check if the video URL is a valid YouTube URL
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+/;
    const isValidYoutubeUrl = youtubeUrlRegex.test(
      modules[currentModuleIndex].video
    );

    if (!isValidYoutubeUrl) {
      console.error("Invalid YouTube URL");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/courses", {
        title,
        description,
        image,
        teacher,
        category,
        modules,
      });

      if (response.status === 201) {
        console.log("Course created successfully");
        setTitle("");
        setDescription("");
        setImage("");
        setTeacher("");
        setCategory("");
        setModules([
          {
            title: "",
            description: "",
            video: "",
          },
        ]);
        onCourseCreate();
        // Set the created course
        setCreatedCourse(response.data);
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error("Failed to create course:", error);

      handleResetForm();
    }
  };

  const currentModule = modules[currentModuleIndex];

  return (
    <div className="course-creation-container">
      <h3>Create Course</h3>
      {showSuccessMessage && (
        <div className="success-message">Course created successfully!</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select a category</option>
            <option value="stem">STEM</option>
            <option value="languages">Languages</option>
            <option value="creative">Creative</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="teacher">Teacher:</label>
          <input
            type="text"
            id="teacher"
            value={teacher}
            onChange={handleTeacherChange}
            required
          />
        </div>
        <h4>Module {currentModuleIndex + 1}</h4>
        <div className="form-group">
          <label htmlFor="module-title">Module Title:</label>
          <input
            type="text"
            id="module-title"
            name="title"
            value={currentModule && currentModule.title}
            onChange={handleModuleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="module-description">Module Description:</label>
          <textarea
            id="module-description"
            name="description"
            value={currentModule && currentModule.description}
            onChange={handleModuleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="module-video">Module Video URL:</label>
          <input
            type="text"
            id="module-video"
            name="video"
            value={currentModule && currentModule.video}
            onChange={handleModuleChange}
            required
          />
        </div>
        {currentModuleIndex === modules.length - 1 && (
          <button type="button" onClick={handleAddModule}>
            Add Module
          </button>
        )}
        <button type="submit">Create Course</button>
      </form>
      {showSuccessMessage && (
        <div className="success-message">Course created successfully!</div>
      )}
      {/* Display the CourseList component with the createdCourse prop */}
      {createdCourse && currentModule && (
        <div>
          <h3>Created Course</h3>
          <Card className="course-card">
            <Card.Body>
              <Card.Title>{createdCourse.title}</Card.Title>
              <Card.Text>{createdCourse.description}</Card.Text>
              <Button variant="danger">Delete</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CourseCreation;
