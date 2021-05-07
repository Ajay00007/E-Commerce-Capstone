import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import DashboardSummary from "../components/DashboardSummary";
import DashboardSales from "../components/DashboardSales";
import DashboardCustomers from "../components/DashboardCustomers";
import DashboardInventory from "../components/DashboardInventory";
import AdminRoute from "../components/AdminRoute";
// import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  let match = useRouteMatch();

  return (
    <Container fluid className="mt-3 mb-5 min-vh-100">
      <Row xs={1} md={2}>
        <Col lg={1}>
          <Nav className="flex-column">
            <h6 className="text-center">Dashboard</h6>
            <Nav.Link as={Link} to={`${match.url}`} active>
              Summary
            </Nav.Link>
            <Nav.Link as={Link} to={`${match.url}/sales`}>
              Sales
            </Nav.Link>
            <Nav.Link as={Link} to={`${match.url}/customers`}>
              Customers
            </Nav.Link>
            <Nav.Link as={Link} to={`${match.url}/inventory`}>
              Inventory
            </Nav.Link>
          </Nav>
        </Col>
        <Col lg={11}>
          {/* <Button>Dashboard Menu</Button> */}
          <Switch>
            <AdminRoute
              path={`${match.path}`}
              exact
              component={DashboardSummary}
            />
            <AdminRoute
              path={`${match.path}/sales`}
              component={DashboardSales}
            />
            <AdminRoute
              path={`${match.path}/customers`}
              component={DashboardCustomers}
            />
            <AdminRoute
              path={`${match.path}/inventory`}
              component={DashboardInventory}
            />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
