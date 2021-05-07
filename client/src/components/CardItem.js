import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../API";
import styles from "./CardItem.module.css";

export default function CardItem(item) {
  if (!item) return null;
  return (
    <Card key={item._id} className={styles.cardStyle}>
      <Card.Img
        src={`${baseUrl}/${item.productImage}`}
        alt=""
        loading="lazy"
        className={styles.cardImage}
      />
      <Card.Body>
        <Card.Title>{item.productName}</Card.Title>
        <Card.Subtitle>{item.manufacturer}</Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>Price: ${item.price.toFixed(2)}</ListGroup.Item>
        </ListGroup>
        <Link to={`/product/${item._id}`}>View</Link>
      </Card.Body>
    </Card>
  );
}
