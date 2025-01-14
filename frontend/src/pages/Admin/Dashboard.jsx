import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const {Email} = useParams()
  const Navigate = useNavigate()
  // Data for drivers leaderboard
  const topDrivers = [
    { name: "John Doe", rides: 150 },
    { name: "Jane Smith", rides: 140 },
    { name: "Robert Johnson", rides: 130 },
    { name: "Michael Brown", rides: 120 },
    { name: "Emily Davis", rides: 110 },
    { name: "William Wilson", rides: 100 },
    { name: "Olivia Anderson", rides: 95 },
    { name: "James Thomas", rides: 90 },
    { name: "Sophia White", rides: 85 },
    { name: "Daniel Harris", rides: 80 },
  ];

  // Define colors for the pie chart
  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#00C49F",
    "#FF8042",
    "#8470FF",
    "#FF6347",
  ];

  return (
    <Container fluid className="p-4">
      <div className="flex justify-between items-center">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      <div className=" flex items-center gap-10 mr-20">
      <Button onClick={()=>(Navigate(`/adminissue/${Email}`))} sx={
        {
          border:'2px red solid',
          color:'red'
        }
      } variant="outlined">Issues</Button>
      <Button onClick={()=>(Navigate('/'))} variant="contained">Logout</Button>
      <Button onClick={()=>(Navigate(`/admindriver/${Email}`))} variant="outlined">Drivers</Button>
      </div>
      </div>

      {/* Overview Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Rides</Card.Title>
              <h3>1020</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Number of Buses</Card.Title>
              <h3>100</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Amount Collected</Card.Title>
              <h3>$15020</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row>
        {/* Leaderboard Table */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Top 10 Bus Drivers by Rides</Card.Title>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Driver Name</th>
                    <th>Rides</th>
                  </tr>
                </thead>
                <tbody>
                  {topDrivers.map((driver, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{driver.name}</td>
                      <td>{driver.rides}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>

        {/* Drivers' Rides Distribution - Pie Chart */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Drivers' Rides Distribution</Card.Title>
              <PieChart width={400} height={300}>
                <Pie
                  data={topDrivers}
                  dataKey="rides"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, rides }) => `${name}: ${rides}`}
                >
                  {topDrivers.map((driver, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
