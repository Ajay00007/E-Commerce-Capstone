import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function TopNav() {
  const { currentUser, isAdmin, logout } = useAuth();
  const { cartItems } = useCart();

  const [queryStr, setQueryStr] = useState("");

  const history = useHistory();

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!queryStr || queryStr === "") return;
    setQueryStr("");
    history.push(`/search?q=${queryStr}`);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <img
          src={`${process.env.PUBLIC_URL}/logo512.png`}
          alt="EcoMetric"
          style={{ height: "25px" }}
        />{" "}
        EcoMetrix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="topNav" />
      <Navbar.Collapse id="topNav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {currentUser ? (
            <Dropdown>
              <Dropdown.Toggle variant="dark">
                Hello, {currentUser.name}!
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isAdmin ? (
                  <>
                    <Dropdown.Header>Admin Menu</Dropdown.Header>
                    <Dropdown.Item as={Link} to="/admin-dashboard">
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/add-product">
                      Add Product
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item as={Link} to="/update-account">
                    Account Details
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          ) : null}

          <Nav.Link
            as={Link}
            to="/cart"
            aria-label="shopping cart"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Shopping Cart"
          >
            <i className="fas fa-shopping-cart"></i>
            {cartItems.length > 0 ? (
              <Badge variant="danger">
                {cartItems.length <= 10 ? cartItems.length : `10+`}
              </Badge>
            ) : null}
          </Nav.Link>

          {currentUser ? (
            <Nav.Link as={Link} to="/" onClick={logout}>
              Logout
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>

              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>

        <Form inline onSubmit={handleSearchSubmit}>
          <FormControl
            type="text"
            placeholder="Search..."
            className="mr-sm-2"
            onChange={(e) => setQueryStr(e.target.value)}
            value={queryStr}
          />
          <Button
            variant="outline-info"
            type="submit"
            disabled={queryStr === "" ? true : false}
          >
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
