import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import CardItem from "./CardItem";
import styles from "./FeaturedItems.module.css";

export default function FeaturedItems({ items }) {
  if (items) {
    const topItems = items.slice(0, 4);

    return (
      <Jumbotron className="mt-5 mb-5 text-center">
        <h3 className="mb-3">Featured Items</h3>
        <Container className={styles.cardContainer}>
          {topItems.map(CardItem)}
        </Container>
      </Jumbotron>
    );
  } else {
    return null;
  }
}
