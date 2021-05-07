import React from "react";
import { Form } from "react-bootstrap";

export default function FormGroupPostal({ currentUser, postalCodeRef }) {
  return (
    <Form.Group id="postalCode">
      <Form.Label>Postal Code</Form.Label>
      <Form.Control
        defaultValue={currentUser.postalCode}
        ref={postalCodeRef}
        required
      />
    </Form.Group>
  );
}
