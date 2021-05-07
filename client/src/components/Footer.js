import React from "react";
import { Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="container-fluid">
      <Container style={{ textAlign: "center" }}>
        <p>EcoMetrix E-Commerce © - {new Date().getFullYear()}</p>
        <p>
          Contact: <a href="mailto:info@email.com">info@email.com</a>{" "}
        </p>
        <Row
          className="d-flex justify-content-center"
          style={{ fontSize: "2em" }}
        >
          <a className="mr-4" href="https://facebook.com">
            <i className="fab fa-facebook-square"></i>
          </a>
          <a className="mr-4" href="https://twitter.com">
            <i className="fab fa-twitter-square"></i>
          </a>
          <a href="https://youtube.com">
            <i className="fab fa-youtube-square"></i>
          </a>
        </Row>
      </Container>
    </footer>
  );
}
