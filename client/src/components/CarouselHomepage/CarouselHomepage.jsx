import React from "react";
import { Carousel } from "react-bootstrap";
import "./CarouselHomepage.css";
import carousel1 from "../../assets/images/carousel1.jpeg";
import carousel2 from "../../assets/images/carousel2.jpeg";
import carousel3 from "../../assets/images/carousel3.jpg";

function CarouselHomepage() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="carousel-image" src={carousel1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-image" src={carousel2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-image" src={carousel3} alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHomepage;
