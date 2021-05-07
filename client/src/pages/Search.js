import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { APIpaths } from "../API";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styles from "./Products.module.css";
import LoadingSpinner from "../components/LoadingSpinner";
import CardItem from "../components/CardItem";

export default function Search() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    setLoading(true);
    handleGetData(query);
  }, [query]);

  async function handleGetData(query) {
    try {
      const results = await axios.get(`${APIpaths.searchQuery}?q=${query}`);

      setProducts(results.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      return console.log(error);
    }
  }

  return (
    <Container className="min-vh-100 mt-5 mb-5">
      <h1>Search Results</h1>

      <Container className="text-center">
        {!loading && products && products.length > 0 ? (
          <p>Showing results for "{query}"</p>
        ) : null}
        <Row className={styles.rowFlex}>
          {loading ? (
            <LoadingSpinner />
          ) : products && products.length > 0 ? (
            products.map(CardItem)
          ) : (
            <Col>
              <p>No content to display.</p>
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  );
}
