import React, { useState, useRef } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AddProduct() {
  const productName = useRef();
  const manufacturer = useRef();
  const description = useRef();
  const price = useRef();
  const stockQty = useRef();
  const upc = useRef();
  const productImage = useRef();

  const [error, setError] = useState("");

  const { createProduct } = useAuth();

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      const newItemData = {
        productName: productName.current.value,
        manufacturer: manufacturer.current.value,
        description: description.current.value,
        price: price.current.value,
        stockQty: stockQty.current.value,
        upc: upc.current.value,
        productImage: productImage.current.value,
      };

      createProduct(newItemData);

      history.push("/");
    } catch (error) {
      setError("Failed to create product.");
    }
  }
  return (
    <Container className="min-vh-100 mt-5">
      <h1>Add A Product</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a product name"
            ref={productName}
            required
          />
        </Form.Group>

        <Form.Group controlId="manufacturer">
          <Form.Label>Manufacturer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter manufacturer"
            ref={manufacturer}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} ref={description} required />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="100.00"
            ref={price}
            required
          />
        </Form.Group>

        <Form.Group controlId="upcId">
          <Form.Label>UPC</Form.Label>
          <Form.Control
            type="text"
            placeholder="123456789-0"
            ref={upc}
            required
          />
        </Form.Group>

        <Form.Group controlId="stockQty">
          <Form.Label>Stock Quantity</Form.Label>
          <Form.Control
            type="number"
            step="1"
            placeholder="50"
            ref={stockQty}
          />
        </Form.Group>

        <Form.Group controlId="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="text"
            name="productImage"
            required
            ref={productImage}
            placeholder="http://..."
          />
        </Form.Group>

        <hr />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
