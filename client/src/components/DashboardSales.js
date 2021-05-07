import Chart from "chart.js";
import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";

const SALES_DATA = [
  {
    month: "Janurary",
    salesVolume: 65,
    netChange: "+5",
  },
  {
    month: "February",
    salesVolume: 59,
    netChange: "-6",
  },
  {
    month: "March",
    salesVolume: 80,
    netChange: "+21",
  },
  {
    month: "April",
    salesVolume: 81,
    netChange: "+1",
  },
  {
    month: "May",
    salesVolume: 56,
    netChange: "-25",
  },
  {
    month: "June",
    salesVolume: 55,
    netChange: "-1",
  },
  {
    month: "July",
    salesVolume: 40,
    netChange: "-15",
  },
];

export default function DashboardSales() {
  useEffect(() => {
    drawChart();
  });

  function retunLabels(data) {
    let arrayOfLabels = [];

    data.forEach((point) => {
      arrayOfLabels.push(point.month);
    });

    return arrayOfLabels;
  }

  function returnDataPoints(data) {
    let arrayOfPoints = [];

    data.forEach((point) => {
      arrayOfPoints.push(point.salesVolume);
    });

    return arrayOfPoints;
  }

  function drawChart() {
    const ctx = document.getElementById("monthlySales");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: retunLabels(SALES_DATA),
        datasets: [
          {
            label: "Monthly Sales",
            data: returnDataPoints(SALES_DATA),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            lineTension: 0,
          },
        ],
      },
      options: {},
    });
  }
  return (
    <Container>
      <h2 className="text-center">Recent Monthly Sales</h2>
      <canvas id="monthlySales"></canvas>
      <Table responsive striped bordered hover size="sm" className="mt-4">
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Sales Volume</th>
            <th>Net Change</th>
          </tr>
        </thead>
        <tbody>
          {SALES_DATA.map((month, idx) => {
            return (
              <tr key={idx}>
                <td>{month.month}</td>
                <td>{month.salesVolume}</td>
                <td>{month.netChange}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
