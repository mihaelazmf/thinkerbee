import React from "react";
import { Container, Card, CardGroup, Button } from "react-bootstrap";
import "./CoursesCardsHomepage.css";
import mathImage from "../../assets/images/math.jpeg";
import creativeImage from "../../assets/images/creative.jpeg";
import languagesImage from "../../assets/images/languages.jpg";

function CoursesCardsHomepage() {
  return (
    <Container>
      <CardGroup className="my-4">
        <Card className="mx-2">
          <Card.Img variant="top" src={mathImage} />
          <Card.Body>
            <Card.Title>Math Courses</Card.Title>
            <Card.Text>
              Improve your math skills with our engaging and interactive
              courses!
            </Card.Text>
            <Button href="/stemcourses" variant="primary">
              Learn More
            </Button>
          </Card.Body>
        </Card>

        <Card className="mx-2">
          <Card.Img variant="top" src={creativeImage} />
          <Card.Body>
            <Card.Title>Creative Courses</Card.Title>
            <Card.Text>
              Discover the wonders of science with our hands-on courses and
              experiments!
            </Card.Text>
            <Button href="/creativecourses" variant="primary">
              Learn More
            </Button>
          </Card.Body>
        </Card>

        <Card className="mx-2">
          <Card.Img variant="top" src={languagesImage} />
          <Card.Body>
            <Card.Title>Language Courses</Card.Title>
            <Card.Text>
              Learn a new language or improve your language skills with our
              immersive courses!
            </Card.Text>
            <Button href="/languagescourses" variant="primary">
              Learn More
            </Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </Container>
  );
}
export default CoursesCardsHomepage;
