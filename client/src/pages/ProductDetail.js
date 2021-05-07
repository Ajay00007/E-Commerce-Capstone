import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIpaths, baseUrl } from "../API";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import FeaturedItems from "../components/FeaturedItems";

export default function ProductDetail({ match }) {
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { addToCart } = useCart();
  const { isAdmin, deleteProduct } = useAuth();

  const history = useHistory();

  function handleModalClose() {
    setShowModal(false);
  }

  function handleModalShow() {
    setShowModal(true);
  }

  function handleDelete(e) {
    e.preventDefault();

    try {
      deleteProduct(productData._id);
      history.push("/products");
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddToCart(productId) {
    setShowAlert(true);
    addToCart(productId);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
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
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <p>Product has been added to cart.</p>
        </Alert>
      )}
      {!loading && isAdmin ? (
        <Modal
          show={showModal}
          onHide={handleModalClose}
          backdrop="static"
          keyboard={false}
          animation="false"
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
      <Row xs={1} md={2}>
        {loading ? (
          <LoadingSpinner />
        ) : productData ? (
          <>
            <Col className="mb-4">
              <Image src={`${baseUrl}/${productData.productImage}`} fluid />
            </Col>
            <Col>
              <h2>{productData.productName}</h2>
              <h4>By: {productData.manufacturer}</h4>
              <b>Price: ${productData.price.toFixed(2)}</b>
              <hr />
              <p>{productData.description}</p>
              <br />

              <Button
                variant={productData.stockQty > 0 ? "primary" : "light"}
                onClick={() => handleAddToCart(productData._id)}
                className="mt-4"
                disabled={productData.stockQty > 0 ? false : true}
              >
                <Badge>
                  <i className="fas fa-shopping-cart"></i>
                </Badge>
                Add to Card
              </Button>

              <hr />

              <p>Rating: {productData.rating}</p>
              <p>UPC: {productData.upc}</p>

              <Container>
                {productData.stockQty > 0 ? (
                  <div>
                    <h5>
                      <i
                        className="fas fa-truck"
                        style={{ color: "#007bff" }}
                      ></i>{" "}
                      Available to Ship
                    </h5>
                    <p>Orders over $50 qualify for free shipping.</p>
                    <h5>
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>{" "}
                      This item is available
                    </h5>
                  </div>
                ) : (
                  <h3>
                    <i className="fas fa-times" style={{ color: "red" }}></i>{" "}
                    Out of Stock
                  </h3>
                )}
                <p>Stock: {productData.stockQty}</p>
              </Container>
            </Col>
          </>
        ) : (
          <Col>No content to display.</Col>
        )}
      </Row>
      {isAdmin && productData ? (
        <Row>
          <Col>
            <hr />
            <h3>Admin Actions</h3>

            <Button
              variant="warning"
              className="mb-2"
              as={Link}
              to={`/edit-product/${productData._id}`}
            >
              Edit Product
            </Button>
            <br />
            <Button variant="danger" onClick={handleModalShow}>
              Delete Product
            </Button>
          </Col>
        </Row>
      ) : null}
      <FeaturedItems />
    </Container>
  );
}
