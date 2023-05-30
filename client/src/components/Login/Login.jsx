import React, { useState } from "react";
import {
  MDBTabs,
  MDBContainer,
  MDBTabsContent,
  MDBTabsPane,
  MDBCheckbox,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/bee.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [justifyActive] = useState("tab1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("token", data.token);
        // Navigate to the dashboard page or any other desired page
        navigate(data.dashboardRoute);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login.");
    }
  };

  return (
    <main className="login-main">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <div className="login-logo-container">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
        <h2 className="text-center mb-4">Login</h2>
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        ></MDBTabs>

        <MDBTabsContent>
          {/* Sign In  */}
          <MDBTabsPane show={justifyActive === "tab1"}>
            <div className="text-center mb-3"></div>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-outline mb-4">
                <MDBInput
                  label="Email"
                  type="email"
                  id="loginEmail"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <MDBInput
                  label="Password"
                  type="password"
                  id="loginPassword"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger mb-4" role="alert">
                  {error}
                </div>
              )}

              <div className="form-outline mb-4">
                <MDBCheckbox
                  label="Remember me"
                  id="rememberMe"
                  name="rememberMe"
                />
              </div>

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
                Sign in
              </MDBBtn>
            </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </main>
  );
};

export default Login;
