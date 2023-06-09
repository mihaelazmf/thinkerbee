const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
const userRoutes = require("./routes/userRoutes");
//const path = require('path');
// Import necessary modules and models
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const Course = require("./models/courses");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
const getUser = require("./middlewares/auth");

app.use(express.json());
app.use(cors());
app.use(getUser);
app.use("./models/users", userRoutes);

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://mihaelazmf:Password123@clusterthinkerbee.tm0jbwa.mongodb.net/thinkerbee?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

// Login route
app.post("/login", async (req, res) => {
  // Retrieve email and password from the request body
  const { email, password } = req.body;
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored password hash
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      "5T1xWOB4psqQFMfSUnyXTrRnOGMAvmCHoEbemsaVeWIfvvd4fJkVN3/6Tz4wo3DDzNgksu+SVKoS4cZv0pWwS2uyDjOtgSDCBYODz+rLfCI="
    );

    // Determine the dashboard route based on the user type
    let dashboardRoute = "";
    if (user.userType === "child" || user.userType === "parent") {
      dashboardRoute = "/homepage";
    } else if (user.userType === "teacher") {
      dashboardRoute = "/dashboard/teacher";
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }
    console.log("Token:", token);
    console.log("Dashboard Route:", dashboardRoute);
    // Return the token and dashboard route as the response
    res.json({ token, dashboardRoute });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/login", (req, res) => {
  res.send("Login page"); // Replace this with the desired response or template rendering logic
});

// Registration route
app.post("/register", async (req, res) => {
  // Retrieve user details from the request body
  const { name, email, password, userType } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      console.log("Email address is already registered");
      return res
        .status(400)
        .json({ error: "Email address is already registered" });
    }

    // Hash the password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
      if (error) {
        console.log("Error occurred during password hashing:", error);
        return res.status(500).json({ error: "Failed to register user" });
      }

      // Create a new user
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        userType,
      });

      // Save the new user to the database
      await newUser.save();
      console.log("User registered successfully:", newUser);

      // Send confirmation email
      const mailOptions = {
        from: "thinkerbee.business@gmail.com",
        to: email,
        subject: "Registration Confirmation",
        text: "Thank you for registering. Your account has been successfully created.",
      };

      await transporter.sendMail(mailOptions);
      // Send a success message in the response
      res.json({
        message:
          "Congratulations! Your account has been successfully created. Please check your email to verify your account.",
      });
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email === 1
    ) {
      // Duplicate key error for email field
      console.log("Email address is already registered");
      return res
        .status(400)
        .json({ error: "Email address is already registered" });
    }

    console.log("Registration error:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});
app.get("/register", (req, res) => {
  res.send("Register page"); // Replace this with the desired response or template rendering logic
});
// Course routes
app.post("/courses", async (req, res) => {
  // Retrieve course details from the request body
  const { title, description, image, teacher, category, modules } = req.body;

  try {
    // Create a new course
    const newCourse = new Course({
      title,
      description,
      image,
      teacher,
      category,
      modules: modules.map((module) => {
        const { title, description, video } = module;
        return {
          title,
          description,
          video,
        };
      }),
    });

    // Save the new course to the database
    const createdCourse = await newCourse.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    console.error("Failed to create course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
});

app.get("/courses", async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();

    // Modify the response format to include image and teacher
    const formattedCourses = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      description: course.description,
      image: course.image,
      teacher: course.teacher,
      category: course.category,
      modules: course.modules.map((module) => ({
        title: module.title,
        description: module.description,
        video: module.video,
      })),
    }));

    res.json(formattedCourses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

app.put("/courses/:id", async (req, res) => {
  // Retrieve course details from the request body
  const { title, description, modules } = req.body;

  try {
    // Update the course by its ID
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, modules },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: "Failed to update course" });
  }
});

app.delete("/courses/:id", async (req, res) => {
  try {
    // Delete the course by its ID
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete course" });
  }
});

// Serve the course list page
app.get("/course-list", async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();

    res.render("courseList", { courses }); // Pass courses as data to the course list page
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Serve the individual course page
app.get("/course/:id", async (req, res) => {
  try {
    // Retrieve the course ID from the request parameters
    const courseId = req.params.id;

    // Find the course by its ID in the database
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Failed to fetch course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

// Configure the email transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thinkerbee.business@gmail.com",
    pass: "juimnzszowesowmf",
  },
});

// API endpoint to handle form submission
app.post("/contactform", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "thinkerbee.business@gmail.com",
    subject: "Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// Protected route example
app.get("/protected", getUser, (req, res) => {
  // Access the authenticated user
  const user = req.user;

  // Handle the protected route logic here
  // ...

  res.json({ message: "Protected route accessed successfully" });
});

// Start the server
app.listen(3001, () => {
  console.log("Server runs");
});
