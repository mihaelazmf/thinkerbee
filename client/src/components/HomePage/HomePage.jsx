import React from "react";
import { Container } from "react-bootstrap";
import AboutUs from "../AboutUs/AboutUs";
import CoursesCardsHomepage from "../CoursesCardsHomepage/CoursesCardsHomepage";
import CarouselHomepage from "../CarouselHomepage/CarouselHomepage";
import ContactForm from "../ContactForm/ContactForm";
import "./HomePage.css";
import logo from "../../assets/images/bee.png";

function HomePage() {
  return (
    <div className="bg-light home-page" style={{ backgroundColor: "#FFFFFF" }}>
      {/*Carousel */}
      <div
        style={{ width: "100vw", marginLeft: "-15px", marginRight: "-15px" }}
      >
        <CarouselHomepage />
      </div>
      {/*Courses Cards */}

      <Container className="my-5">
        <CoursesCardsHomepage />
      </Container>

      {/* About Us */}
      <Container id="about-us">
        <AboutUs />
      </Container>

      {/* Contact Form */}
      <Container id="contact-us" className="my-5 justify-content-center">
        <div className="contact-container">
          <img
            src={logo}
            alt="Thinkerbee Logo"
            height="300"
            className="d-inline-block align-top me-2"
            style={{ flexBasis: "100%" }}
          />
        </div>
        <ContactForm style={{ flexBasis: "100%" }} />
      </Container>
    </div>
  );
}

export default HomePage;
