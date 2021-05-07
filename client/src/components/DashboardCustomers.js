import React from "react";
import { Container, Table } from "react-bootstrap";

export default function DashboardCustomers() {
  return (
    <Container>
      <h2 className="text-center">Customer Management</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@jmon</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Sarah</td>
            <td>Finch</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
