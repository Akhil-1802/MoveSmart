import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "./Issue.css"; // Import custom CSS file for additional styling
import { Loader } from "lucide-react";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

function Issue() {
  const { Email } = useParams()
  const [issues, setIssues] = useState([]);
  const [ loading , setloading] = useState(false)
  // Fetch issues from the backend
  const getIssues = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/getissues/${Email}`);
      if (response.ok) {
        const data = await response.json();
        setIssues(data.Issues);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  // Delete an issue
  const deleteIssue = async (id) => {
    const response = await fetch(
      `http://localhost:3000/admin/deleteissue/${id}`,
      { method: "POST" }
    );
    if (response.ok) {
      toast.success("Issue Deleted Successfully", {
        autoClose: 2000,
        position: "top-center",
      });
      getIssues(); // Reload the issue list after deletion
    }
  };

  // Resolve an issue
  const handleResolved = async (issue) => {
    setloading(true)
    try {
      const response = await fetch(
        `http://localhost:3000/admin/completeissue/${issue._id}/${issue.Email}/${issue.Name}/${issue.Issue}/${issue.BusNumber}`,
        { method: "POST" }
      );
      if (response.ok) {
        toast.success("Issue Resolved", {
          autoClose: 2000,
          position: "top-center",
        });
        getIssues(); // Reload the issue list after resolving
      }
    } catch (error) {
      setloading(false)
      console.log(error)
    }
    finally{
      setloading(false)
    }
    
  };

  // Mark issue as not resolved
  const handleNotResolved = async (id) => {
    setloading(true)
    try {
      const response = await fetch(
        `http://localhost:3000/admin/deleteissue/${id}`,
        { method: "POST" }
      );
      if (response.ok) {
        toast.error("Issue Not Resolved", {
          autoClose: 2000,
          position: "top-center",
        });
        getIssues(); // Reload the issue list after marking as not resolved
      }
    } catch (error) {
      setloading(false)
    }
    finally{
      setloading(false)
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div className="min-h-screen bg-slate-300 ">
      {
        loading && <div className="inset-0 fixed backdrop-blur-sm z-20 flex items-center justify-center">
          <CircularProgress />
        </div>
      }
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="w-full  flex justify-between items-center">
          <h1 className="text-4xl w-full underline font-bold text-center text-gray-900">Problems</h1>
        </div>
      </header>
      <Container className="pt-4">
      

        {issues.length === 0 ? (
          <Alert variant="info" className="text-center">
            <h4>No Issues Found</h4>
            Please check back later.
          </Alert>
        ) : (
          <Row>
            {issues.map((issue) => (
              <Col md={4} key={issue._id} className="mb-4">
                <Card
                  className={`issue-card shadow-lg ${
                    issue.Completed ? "bg-success" : "bg-danger"
                  } text-white`}
                >
                  <Card.Body>
                    <Card.Title>{issue.Issue}</Card.Title>
                    <Card.Text>
                      <strong>Person Name: </strong>
                      {issue.Name}
                    </Card.Text>
                    <Card.Text>
                      <strong>Email: </strong>
                      {issue.Email}
                    </Card.Text>
                    <Card.Text>
                      <strong>Bus Number: </strong>
                      {issue.BusNumber}
                    </Card.Text>

                    <div className="d-flex justify-content-between mt-4">
                      {issue.Completed ? (
                        <Button
                          variant="success"
                          onClick={() => deleteIssue(issue._id)}
                          size="sm"
                        >
                          Delete
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="success"
                            onClick={() => handleResolved(issue)}
                            size="sm"
                            className="resolve"
                          >
                            Mark as Resolved
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleNotResolved(issue._id)}
                            size="sm"
                            className="not-resolved"
                          >
                            Mark as Not Resolved
                          </Button>
                        </>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Issue;
