import React from "react";
import { Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../API";

export default function CarouselItems({ items }) {
  if (items) {
    const itemsToShow = items.slice(0, 3);
    return (
      <Carousel>
        {itemsToShow.map((item) => {
          return (
            <Carousel.Item
              key={item._id}
              style={{ background: "rgba(0, 0, 0, .8)" }}
            >
              <img
                className="d-block w-100"
                src={`${baseUrl}/${item.productImage}`}
                style={{
                  width: "100%",
                  height: "50vh",
                  objectFit: "cover",
                  opacity: "0.75",
                }}
                alt={item.productName}
              />
              <Carousel.Caption>
                <h3>
                  <Button as={Link} to={`/product/${item._id}`} variant="light">
                    <strong>{item.productName}</strong>
                  </Button>
                </h3>
                <p>{item.manufacturer}</p>
                <p>
                  <strong>${item.price.toFixed(2)}</strong>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  } else {
    return null;
  }
}
