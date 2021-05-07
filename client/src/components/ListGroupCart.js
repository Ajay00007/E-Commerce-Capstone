import React from "react";
import { ListGroup } from "react-bootstrap";

export default function ListGroupCart(props) {
  const subTotalCounts = [
    { name: "Sub Total", value: props.subTotal.toFixed(2) },
    { name: "Tax", value: props.taxCost.toFixed(2) },
    { name: "Shipping", value: props.shippingCost.toFixed(2) },
  ];

  return (
    <ListGroup style={{ maxHeight: "90vh", overflowY: "auto" }}>
      {props.cartItems.map((item) => {
        return (
          <ListGroup.Item
            key={item._id}
            className="d-flex justify-content-between align-items-center"
          >
            {item.productName} ({item.qty})
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </ListGroup.Item>
        );
      })}
      <ListGroup.Item>
        {subTotalCounts.map((count, idx) => {
          return (
            <em
              key={idx}
              className="d-flex justify-content-between align-items-center"
            >
              {count.name}:<span>${count.value}</span>
            </em>
          );
        })}
      </ListGroup.Item>

      <ListGroup.Item>
        <strong className="d-flex justify-content-between align-items-center">
          Total
          <span>${props.totalCost.toFixed(2)}</span>
        </strong>
      </ListGroup.Item>
    </ListGroup>
  );
}
