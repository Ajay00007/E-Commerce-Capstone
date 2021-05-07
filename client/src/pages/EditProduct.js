import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { APIpaths } from "../API";
import { useAuth } from "../contexts/AuthContext";

export default function EditProduct({ match }) {
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productName = useRef();
  const manufacturer = useRef();
  const description = useRef();
  const price = useRef();
  const stockQty = useRef();
  const upc = useRef();

  const { updateProduct } = useAuth();

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      const updatedItemData = {
        productName: productName.current.value,
        manufacturer: manufacturer.current.value,
        description: description.current.value,
        price: price.current.value,
        stockQty: stockQty.current.value,
        upc: upc.current.value,
      };

      updateProduct(productData._id, updatedItemData);

      history.push(`/product/${productData._id}`);
    } catch (error) {
      setError("Failed to update product.");
    }
  }

  useEffect(() => {
    axios
      .get(APIpaths.getOneItem + match.params.id)
      .then((res) => {
        setProductData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [match.params.id]);

  return (
    <Container className="min-vh-100 mt-5">
      <h1>Edit Product</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2>Product ID: {productData._id}</h2>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a product name"
              ref={productName}
              required
              defaultValue={productData.productName}
            />
          </Form.Group>

          <Form.Group controlId="manufacturer">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter manufacturer"
              ref={manufacturer}
              required
              defaultValue={productData.manufacturer}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              ref={description}
              defaultValue={productData.description}
              required
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="100.00"
              ref={price}
              required
              defaultValue={productData.price}
            />
          </Form.Group>

          <Form.Group controlId="upcId">
            <Form.Label>UPC</Form.Label>
            <Form.Control
              type="text"
              placeholder="123456789-0"
              ref={upc}
              required
              defaultValue={productData.upc}
            />
          </Form.Group>

          <Form.Group controlId="stockQty">
            <Form.Label>Stock Quantity</Form.Label>
            <Form.Control
              type="number"
              step="1"
              placeholder="50"
              ref={stockQty}
              defaultValue={productData.stockQty}
            />
          </Form.Group>

          <hr />

          <Button
            variant="primary"
            className="mr-4"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>

          <Button
            variant="secondary"
            as={Link}
            to={`/product/${match.params.id}`}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
}
