import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { APIpaths } from "../API";
import LoadingSpinner from "./LoadingSpinner";

export default function DashboardInventory() {
  const [items, setItems] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${APIpaths.getAllItems}?page=1&limit=10`)
      .then((res) => {
        setItems(res.data.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <h2 className="text-center">Inventory Management</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>Product Name</th>
              <th>Manufacturer</th>
              <th>UPC</th>
              <th>Price</th>
              <th>Stock Qty</th>
            </tr>
          </thead>

          <tbody>
            {items ? (
              items.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.upc}</td>
                    <td className="text-right">${item.price.toFixed(2)}</td>
                    <td className="text-right">{item.stockQty}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Data.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
