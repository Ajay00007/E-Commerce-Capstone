import React, { useState } from "react";
import { useRef } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import FormGroupPostal from "../components/FormGroupPostal";
import FormGroupProvince from "../components/FormGroupProvince";
import { useAuth } from "../contexts/AuthContext";

export default function UpdateAccount() {
  const emailRef = useRef();

  const passwordRef = useRef();
  const passwordConfirmedRef = useRef();

  const streetRef = useRef();
  const cityRef = useRef();
  const provinceRef = useRef();
  const postalCodeRef = useRef();

  const [error, setError] = useState("");

  const { currentUser, updatePassword, updateEmail, updateAddress } = useAuth();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmedRef.current.value) {
      return setError("Passwords do not match.");
    }

    const promises = [];

    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    let address = {};

    if (streetRef.current.value !== currentUser.street) {
      address.street = streetRef.current.value;
    }

    if (cityRef.current.value !== currentUser.city) {
      address.city = cityRef.current.value;
    }

    if (provinceRef.current.value !== currentUser.province) {
      address.province = provinceRef.current.value;
    }

    if (postalCodeRef.current.value !== currentUser.postalCode) {
      address.postalCode = postalCodeRef.current.value;
    }

    if (Object.keys(address).length > 0) {
      promises.push(updateAddress(address));
    }

    Promise.all(promises)
      .then(() => history.push("/"))
      .catch(() => {
        setError("Failed to update account.");
      });
  }

  return (
    <>
      <Container className="mb-4">
        <h2 className="text-center mb-4">Update Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </Form.Group>

          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </Form.Group>

          <Form.Group id="passwordConfirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              ref={passwordConfirmedRef}
              placeholder="Leave blank to keep the same"
            />
          </Form.Group>

          <hr />

          <Form.Group id="street">
            <Form.Label>Street Address</Form.Label>
            <Form.Control defaultValue={currentUser.street} ref={streetRef} />
          </Form.Group>

          <Form.Group id="city">
            <Form.Label>City</Form.Label>
            <Form.Control defaultValue={currentUser.city} ref={cityRef} />
          </Form.Group>

          <FormGroupProvince
            currentUser={currentUser}
            provinceRef={provinceRef}
          />

          <FormGroupPostal
            currentUser={currentUser}
            postalCodeRef={postalCodeRef}
          />

          <Button className="mr-1" type="submit">
            Update
          </Button>
          <Button variant="secondary" as={Link} to="/">
            Cancel
          </Button>
        </Form>
      </Container>
    </>
  );
}
