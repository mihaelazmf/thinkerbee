import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CoursesMain = () => {
  return (
    <div
      className="container"
      style={{ minHeight: "calc(100vh - 60px - 40px)" }}
    >
      <h2
        className="text-center"
        style={{ marginTop: "20px", marginBottom: "40px" }}
      >
        Explore ThinkerBee Courses
      </h2>
      <div className="row">
        <div className="col-md-4">
          <Card style={{ height: "100%" }}>
            <Card.Img
              variant="top"
              src="https://www.northeastohioparent.com/wp-content/uploads/2017/11/STEM-school-subjects.jpg"
              alt="STEM category"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>STEM</Card.Title>
              <Card.Text>
                Spark your curiosity with exciting Science, Technology,
                Engineering, and Math courses.
              </Card.Text>
              <Link to="/stemcourses">
                <Button variant="primary">View Courses</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ height: "100%" }}>
            <Card.Img
              variant="top"
              src="https://imgix.bustle.com/fatherly/2020/03/videoschoolonline-header.jpg?w=768&h=403&fit=crop&crop=faces&auto=format%2Ccompress&q=50&dpr=2"
              alt="Creative category"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Creative</Card.Title>
              <Card.Text>
                Unleash your creativity and imagination with our fun and
                interactive Creative courses.
              </Card.Text>
              <Link to="/creativecourses">
                <Button variant="primary">View Courses</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ height: "100%" }}>
            <Card.Img
              variant="top"
              src="https://bilingualkidspot.com/wp-content/uploads/2020/12/How-many-languages-does-a-polyglot-speak.png"
              alt="Languages category"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Languages</Card.Title>
              <Card.Text>
                Embark on a linguistic journey and explore various languages
                with our engaging Language courses.
              </Card.Text>
              <Link to="/languagescourses">
                <Button variant="primary">View Courses</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>
          Ready to embark on a learning adventure with ThinkerBee?
          <br />
          Register now to unlock all the amazing courses!
        </p>
        <Button href="/register" variant="primary" size="lg">
          Register
        </Button>
      </div>
      <div style={{ marginBottom: "40px" }} /> {/* Added spacing */}
    </div>
  );
};

export default CoursesMain;
