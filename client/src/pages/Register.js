import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const nameRef = useRef();

  const emailRef = useRef();

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const streetRef = useRef();
  const cityRef = useRef();
  const provinceRef = useRef();
  const postalCodeRef = useRef();

  const [error, setError] = useState("");

  const { register } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passowrds do not match.");
    }

    try {
      setError("");

      await register(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        streetRef.current.value,
        cityRef.current.value,
        provinceRef.current.value,
        postalCodeRef.current.value
      );
      history.push("/");
    } catch (error) {
      setError("Failed to create account.");
    }
  }
  return (
    <Container className="min-vh-100 mt-5">
      <h1>Register</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRegisterName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            ref={nameRef}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRegisterEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailRef}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRegisterPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRegisterPassword2">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            ref={passwordConfirmRef}
          />
        </Form.Group>

        <hr />

        <Form.Group id="street">
          <Form.Label>Street Address</Form.Label>
          <Form.Control placeholder={"123 Main St."} ref={streetRef} required />
        </Form.Group>

        <Form.Group id="city">
          <Form.Label>City</Form.Label>
          <Form.Control placeholder={"Somewhere"} ref={cityRef} required />
        </Form.Group>

        <Form.Group id="province">
          <Form.Label>Province</Form.Label>
          <Form.Control
            as="select"
            defaultValue={"Choose..."}
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

        <Form.Group id="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control placeholder={"A1B 2C3"} ref={postalCodeRef} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="div mt-2">
        Already have an account? <Link to="/login">Login.</Link>
      </div>
    </Container>
  );
}
