import React from "react";
import { Container, Pagination } from "react-bootstrap";
import styles from "./PaginationNav.module.css";

export default function PaginationNav({
  totalPages,
  prevPage,
  nextPage,
  currentPage,
  handleGetNextPage,
  handleGetPreviousPage,
  handleGoToPage,
}) {
  const pages = [...Array(totalPages).keys()].map((idx) => idx + 1);

  return (
    <Container className="mb-0 mt-4">
      <Pagination className={`${styles.paginationFlex}`}>
        <Pagination.First
          onClick={() => handleGoToPage(1)}
          disabled={currentPage === 1 ? true : false}
        />
        <Pagination.Prev
          onClick={() => handleGetPreviousPage()}
          disabled={prevPage === null ? true : false}
        />

        {pages.map((page) => {
          return (
            <Pagination.Item
              key={page}
              onClick={() => handleGoToPage(page)}
              active={page === currentPage ? true : false}
            >
              {page}
            </Pagination.Item>
          );
        })}

        <Pagination.Next
          onClick={() => handleGetNextPage()}
          disabled={nextPage === null ? true : false}
        />
        <Pagination.Last
          onClick={() => handleGoToPage(totalPages)}
          disabled={currentPage === totalPages ? true : false}
        />
      </Pagination>
    </Container>
  );
}
