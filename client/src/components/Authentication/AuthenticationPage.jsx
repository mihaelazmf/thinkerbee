import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./AuthenticationPage.css";
import logo from "../../assets/images/bee.png";

function AuthenticationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const { token, dashboardRoute } = data;
        const decodedToken = jwt_decode(token);
        const { userType } = decodedToken;

        switch (userType) {
          case "teacher":
            navigate(dashboardRoute);
            break;
          case "child":
          case "parent":
            navigate(dashboardRoute);
            break;
          default:
            console.log("Invalid user type");
        }
      } else if (response.status === 401) {
        console.log("Invalid password");
      } else if (response.status === 404) {
        console.log("User not found");
      } else {
        console.log("Login error:", response.statusText);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, userType }),
      });

      if (response.ok) {
        const { message } = await response.json();
        console.log("User registered successfully");
        console.log("Message:", message);
        // Set the registration success state to true
        setRegistrationSuccess(true);
      } else {
        const { error } = await response.json();
        console.log("Registration error:", error);
      }
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  const toggleForm = () => {
    setShowRegistration(!showRegistration);
  };

  const renderLoginForm = () => (
    <div>
      <form onSubmit={handleLogin} className="auth-form">
        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
          Sign into your account
        </h5>

        <Form.Group className="mb-4" controlId="email">
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="form-control form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control form-control-lg"
          />
        </Form.Group>

        <div className="pt-1 mb-4">
          <Button className="btn btn-dark btn-lg btn-block" type="submit">
            Login
          </Button>
        </div>

        <a className="small text-muted" href="#register" onClick={toggleForm}>
          Register
        </a>
      </form>
    </div>
  );

  const renderRegistrationForm = () => (
    <form onSubmit={handleRegister} className="auth-form">
      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
        Create an account
      </h5>

      <Form.Group className="mb-4" controlId="name">
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="form-control form-control-lg"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="email">
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="form-control form-control-lg"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="password">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form-control form-control-lg"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="userType">
        <Form.Select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          placeholder="User Type"
          className="form-control form-control-lg"
        >
          <option value="">Select User Type</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="child">Child</option>
        </Form.Select>
      </Form.Group>

      <div className="pt-1 mb-4">
        <Button className="btn btn-dark btn-lg btn-block" type="submit">
          Register
        </Button>
      </div>

      <a className="small text-muted" href="#login" onClick={toggleForm}>
        Back to Login
      </a>
    </form>
  );
  const renderRegistrationSuccessMessage = () => {
    return (
      <div className="alert alert-success" role="alert">
        Congratulations! Please verify your email.{" "}
        <a href="/login">Click here to login.</a>
      </div>
    );
  };
  return (
    <div className="row">
      <div className="col-lg-6 d-none d-lg-flex flex-wrap justify-content-center align-items-center bg-light p-5">
        <img
          src={logo}
          alt="Authentication"
          className="login-img"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
      <div className="col-lg-6 bg-white">
        <div className="p-5">
          {registrationSuccess && renderRegistrationSuccessMessage()}
          {showRegistration ? renderRegistrationForm() : renderLoginForm()}
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
