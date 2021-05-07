import React from "react";
import { Container } from "react-bootstrap";

export default function NotFound() {
  return (
    <Container className="min-vh-100 mt-5">
      <h1>404: Not Found.</h1>
      <p>The page was not found.</p>
    </Container>
  );
}
