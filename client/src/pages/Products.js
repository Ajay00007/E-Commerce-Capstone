import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { APIpaths } from "../API";
import axios from "axios";
import PaginationNav from "../components/PaginationNav";
import styles from "./Products.module.css";
import LoadingSpinner from "../components/LoadingSpinner";
import CardItem from "../components/CardItem";

export default function Products() {
  const totalPages = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const [paginatedData, setPaginatedData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    handleGetData(currentPage);
  }, [currentPage]);

  async function handleGetData(pageToGet = 1, limitToGet = 12) {
    try {
      const results = await axios.get(
        `${
          APIpaths.getAllItems
        }?page=${pageToGet.toString()}&limit=${limitToGet}`
      );

      setPaginatedData(results.data);

      if (results.data.next) {
        setNextPage(results.data.next.page);
      } else {
        setNextPage(null);
      }

      if (results.data.previous) {
        setPrevPage(results.data.previous.page);
      } else {
        setPrevPage(null);
      }

      if (results.data.total.pages !== totalPages.current) {
        totalPages.current = results.data.total.pages;
      }

      setLoading(false);
    } catch (error) {
      return console.log(error);
    }
  }

  function handleGetNextPage() {
    if (nextPage !== null) {
      setCurrentPage(nextPage);
    } else {
      return;
    }
  }

  function handleGetPreviousPage() {
    if (prevPage !== null) {
      setCurrentPage(prevPage);
    } else {
      return;
    }
  }

  function handleGoToPage(pageNum) {
    if (currentPage <= totalPages.current && pageNum > 0) {
      setCurrentPage(pageNum);
    } else {
      return;
    }
  }

  return (
    <Container className="min-vh-100 mt-5">
      <h1>Products</h1>

      <Container className={`mb-5 text-center ${styles.rowFlex}`}>
        {loading ? (
          <LoadingSpinner />
        ) : paginatedData && paginatedData.results.length > 0 ? (
          paginatedData.results.map(CardItem)
        ) : (
          <p>No content to display.</p>
        )}
      </Container>

      {totalPages.current > 1 ? (
        <PaginationNav
          totalPages={totalPages.current}
          prevPage={prevPage}
          nextPage={nextPage}
          currentPage={currentPage}
          handleGetNextPage={handleGetNextPage}
          handleGetPreviousPage={handleGetPreviousPage}
          handleGoToPage={handleGoToPage}
        />
      ) : null}
    </Container>
  );
}
