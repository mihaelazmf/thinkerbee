import React, { useState } from "react";
import { MDBInput, MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/bee.png";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          userType,
        }),
      });

      if (response.ok) {
        // Registration successful

        // Send confirmation email
        const emailResponse = await fetch("/sendConfirmationEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Failed to send confirmation email");
          // Handle the error accordingly
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration.");
    }
  };
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <MDBInput
          label="Name"
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <MDBInput
          label="Email address"
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <MDBInput
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {/* User type selection */}
        <div>
          <p>User Type:</p>
          <label style={{ marginRight: "10px" }}>
            <input
              type="radio"
              value="child"
              checked={userType === "child"}
              onChange={(event) => setUserType(event.target.value)}
            />{" "}
            Child
          </label>
          <label style={{ marginRight: "10px" }}>
            <input
              type="radio"
              value="teacher"
              checked={userType === "teacher"}
              onChange={(event) => setUserType(event.target.value)}
            />{" "}
            Teacher
          </label>
          <label style={{ marginRight: "10px" }}>
            <input
              type="radio"
              value="parent"
              checked={userType === "parent"}
              onChange={(event) => setUserType(event.target.value)}
            />{" "}
            Parent
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        {/* Submit button */}
        <MDBBtn
          color="none"
          className="btn-lg btn-block mb-4"
          style={{
            backgroundColor: "#4c7031",
            color: "#ffffff",
            fontWeight: "bold",
            transition: "all 0.2s ease-in-out",
          }}
          type="submit"
        >
          Register
        </MDBBtn>
      </form>
    </MDBContainer>
  );
}

export default Register;
