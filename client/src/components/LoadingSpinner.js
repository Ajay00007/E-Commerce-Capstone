import React from "react";
import { Container, Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <Container className="d-flex justify-content-center">
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        style={{ height: "50vh", width: "50vh" }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
}
