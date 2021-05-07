import Chart from "chart.js";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function DashboardSummary() {
  useEffect(() => {
    drawBarChart();
    drawPieChart();
    drawHorizontalBarChart();
    drawLineChart();
  }, []);

  function drawBarChart() {
    const ctx = document.getElementById("myBarChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Orders Shipped",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  function drawPieChart() {
    const ctx = document.getElementById("myPieChart");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
          },
        ],
      },
    });
  }

  function drawHorizontalBarChart() {
    const ctx = document.getElementById("myHorizontalBarChart");
    new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Threats",
            backgroundColor: "rgba(204, 0, 0, 0.5)",
            borderColor: "rgb(255, 159, 64, 0.2)",
            borderWidth: 1,
            data: [-31, 86, 32, 60, -49, -76, 78],
          },
          {
            label: "Opportunities",
            backgroundColor: "rgba(0, 102, 255, 0.5)",
            borderColor: "rgb(0, 102, 255)",
            data: [-29, -67, -93, 29, -59, 29, 9],
          },
        ],
      },
    });
  }

  function drawLineChart() {
    const ctx = document.getElementById("monthlySales");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Monthly Sales",
            data: [65, 59, 80, 81, 56, 55, 40],
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
    <>
      <Container>
        <h2 className="text-center">Summary</h2>
        <Row>
          <Col>
            <canvas id="myBarChart"></canvas>
          </Col>
          <Col>
            <canvas id="myPieChart"></canvas>
          </Col>
        </Row>
        <Row>
          <Col>
            <canvas id="myHorizontalBarChart"></canvas>
          </Col>
          <Col>
            <canvas id="monthlySales"></canvas>
          </Col>
        </Row>
      </Container>
    </>
  );
}
