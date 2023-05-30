import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-light text-center py-3">
      <p style={{ color: "#757575" }}>
        Copyright © {new Date().getFullYear()} ThinkerBee
      </p>
      <p style={{ color: "#757575" }}>
        Follow us on social media:{" "}
        <a href="https://twitter.com/" style={{ color: "#FBC02D" }}>
          Twitter
        </a>{" "}
        <a href="https://www.instagram.com/" style={{ color: "#FBC02D" }}>
          Instagram
        </a>
      </p>
    </footer>
  );
}

export default Footer;
