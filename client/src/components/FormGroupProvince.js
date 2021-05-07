import React from "react";
import { Form } from "react-bootstrap";

export default function FormGroupProvince({ currentUser, provinceRef }) {
  return (
    <Form.Group id="province">
      <Form.Label>Province</Form.Label>
      <Form.Control
        as="select"
        defaultValue={currentUser.province || "Choose..."}
        ref={provinceRef}
        required
      >
        <option disabled>Choose...</option>
        <option>Alberta</option>
        <option>British Coloumbia</option>
        <option>Manitoba</option>
        <option>New Brunswick</option>
        <option>Newfoundland and Labrador</option>
        <option>Nova Scotia</option>
        <option>Ontario</option>
        <option>Prince Edward Island</option>
        <option>Quebec</option>
        <option>Saskatechewan</option>
        <option>Northwest Territories</option>
        <option>Nunavut</option>
        <option>Yukon</option>
      </Form.Control>
    </Form.Group>
  );
}
