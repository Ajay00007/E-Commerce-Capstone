import React, { useRef, useState } from "react";
import {
  Container,
  Button,
  Row,
  Form,
  Col,
  Badge,
  Modal,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import FormGroupPostal from "../components/FormGroupPostal";
import FormGroupProvince from "../components/FormGroupProvince";
import ListGroupCart from "../components/ListGroupCart";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { currentUser } = useAuth();
  const {
    cartItems,
    subTotal,
    taxCost,
    shippingCost,
    totalCost,
    clearCart,
  } = useCart();
  const [showModal, setShowModal] = useState(false);

  const streetRef = useRef();
  const cityRef = useRef();
  const provinceRef = useRef();
  const postalCodeRef = useRef();

  const history = useHistory();

  function handleModalShow() {
    setShowModal(true);
  }

  function handleModalConfirm() {
    setShowModal(false);
    clearCart();
    history.push("/");
  }

  function handleCancel() {
    history.push("/cart");
  }

  function handleCheckout(e) {
    e.preventDefault();
    handleModalShow();
    // clearCart();
  }

  return (
    <Container>
      <h1>Checkout</h1>
      <Row xs={1} md={2} className="mb-4">
        <Col className="order-md-last mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span>Your Cart</span>
            <span aria-label="shopping cart" title="Shopping Cart">
              <i className="fas fa-shopping-cart"></i>
              <Badge pill variant="info">
                {cartItems.length}
              </Badge>
            </span>
          </h4>
          <ListGroupCart
            cartItems={cartItems}
            subTotal={subTotal}
            taxCost={taxCost}
            shippingCost={shippingCost}
            totalCost={totalCost}
          />
        </Col>
        <Col>
          <Form onSubmit={handleCheckout}>
            <h4>Billing Address</h4>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={currentUser.name}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                defaultValue={currentUser.street}
                ref={streetRef}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>
                Address 2 <span className="text-muted">(Optional)</span>
              </Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  defaultValue={currentUser.city}
                  ref={cityRef}
                  required
                />
              </Form.Group>

              <FormGroupProvince
                as={Col}
                currentUser={currentUser}
                provinceRef={provinceRef}
              />
            </Form.Row>

            <FormGroupPostal
              as={Col}
              currentUser={currentUser}
              postalCodeRef={postalCodeRef}
            />

            <hr />

            <Form.Group id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Shipping address is the same as my billing address"
              />
            </Form.Group>

            <hr />

            <h4>Payment</h4>

            <Form.Row>
              <Form.Group as={Col} controlId="formCreditName">
                <Form.Label>Name on card</Form.Label>
                <Form.Control type="text" required />
                <Form.Text className="text-muted">
                  Full name as displayed on card
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} controlId="formCreditNumber">
                <Form.Label>Credit card number</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formCreditExpirationMonth">
                <Form.Label>Expiry month</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." required>
                  <option disabled>Choose...</option>
                  <option>Jan</option>
                  <option>Feb</option>
                  <option>Mar</option>
                  <option>Apr</option>
                  <option>May</option>
                  <option>Jun</option>
                  <option>Jul</option>
                  <option>Aug</option>
                  <option>Sep</option>
                  <option>Oct</option>
                  <option>Nov</option>
                  <option>Dec</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formCreditExpirationYear">
                <Form.Label>Expiry year</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>

              <Form.Group as={Col} controlId="formCreditCvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            </Form.Row>

            <Button variant="secondary" className="mr-4" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm Order
            </Button>
          </Form>
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={handleModalConfirm}
        backdrop="static"
        keyboard={false}
        animation="false"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order has been successfully processed.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalConfirm}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
