import React from "react";
import { Button, Container, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../API";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const {
    cartItems,
    subTotal,
    shippingCost,
    taxCost,
    totalCost,
    addToCart,
    removeFromCart,
  } = useCart();

  return (
    <Container className="min-vh-100 mt-5">
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Product Sub-Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => {
                return (
                  <tr key={item._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <Image
                        src={`${baseUrl}/${item.productImage}`}
                        thumbnail
                        style={{ maxHeight: "200px", maxWidth: "200px" }}
                      />
                    </td>
                    <td>
                      <Link to={`/product/${item._id}`}>
                        {item.productName}
                      </Link>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        onClick={() => removeFromCart(item._id)}
                      >
                        -
                      </Button>
                      <span className="px-2">{item.qty}</span>
                      <Button size="sm" onClick={() => addToCart(item._id)}>
                        +
                      </Button>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.qty).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div style={{ textAlign: "right" }}>
            <p>Sub-Total Cost: ${subTotal.toFixed(2)}</p>
            <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
            <p>Tax (HST 13%): ${taxCost.toFixed(2)}</p>
            <b>Total Cost: ${totalCost.toFixed(2)}</b>
            <hr />
            <Button
              variant="success"
              as={Link}
              to="/checkout"
              disabled={cartItems.lenght > 0 ? false : true}
            >
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Container>
  );
}
