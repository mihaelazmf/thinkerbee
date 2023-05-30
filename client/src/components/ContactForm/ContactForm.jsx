import React from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

function ContactForm() {
  const [formStatus, setFormStatus] = React.useState("Send");

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");

    const { name, email, message } = e.target.elements;

    const formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    try {
      const response = await fetch("http://localhost:3001/contactform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("Sent");
        // Reset the form fields
        name.value = "";
        email.value = "";
        message.value = "";
      } else {
        setFormStatus("Error");
      }
    } catch (error) {
      console.error(error);
      setFormStatus("Error");
    }
  };

  return (
    <div className="contact-form-container p-3 my-5 d-flex flex-column w-50">
      <h2 className="contact-form-header">Contact Us</h2>
      <form onSubmit={onSubmit}>
        <MDBInput label="Name" id="name" required />
        <MDBInput label="Email" type="email" id="email" required />
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea className="form-control" id="message" rows="6" required />
        </div>
        <MDBBtn className="form-button" type="submit">
          {formStatus}
        </MDBBtn>
      </form>
    </div>
  );
}

export default ContactForm;
