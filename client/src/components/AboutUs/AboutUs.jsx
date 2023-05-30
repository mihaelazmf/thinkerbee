import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <Container className="about-us-container py-5">
        <Row>
          <Col>
            <Card>
              <Card.Header>About Thinkerbee</Card.Header>
              <Card.Body>
                <Card.Text>
                  Thinkerbee is an e-learning platform for kids that provides
                  engaging and interactive courses to help children learn and
                  grow.
                </Card.Text>
                <Card.Text>
                  Our mission is to make learning fun and accessible to all
                  children, regardless of their background or circumstances. We
                  believe that every child has the potential to learn and
                  succeed, and we're committed to helping them do so.
                </Card.Text>
                <Card.Text>
                  Our team is made up of experienced educators, designers, and
                  developers who are passionate about creating innovative and
                  effective learning experiences for kids.
                </Card.Text>
                <Button variant="primary" href="/register">
                  Register Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
