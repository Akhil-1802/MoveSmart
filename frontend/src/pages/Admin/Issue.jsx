import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

function Issue() {
  const [issues, setIssues] = useState([]);

  // Fetch issues from the backend
  const getIssues = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/getissues');
      if (response.ok) {
        const data = await response.json();
        setIssues(data.Issues);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  
  const deleteIssue = async(id)=>{
    const response = await fetch(`http://localhost:3000/admin/deleteissue/${id}`,{method:"POST"})
    if(response.ok){
        toast.success('Deleted',{
            autoClose:2000,
            position:'top-center'
        })
    }
  }
  // Handler for Resolved button
  const handleResolved = async(issue) => {
    const response = await fetch(`http://localhost:3000/admin/completeissue/${issue._id}/${issue.Email}/${issue.Name}/${issue.Issue}/${issue.BusNumber}`,{method:"POST"})
    if(response.ok){
        toast.success('Issue Resolved',{
            autoClose:2000,
            position:'top-center'
        })
    }
  };

  // Handler for Not Resolved button
  const handleNotResolved = async(id) => {
    const response = await fetch(`http://localhost:3000/admin/deleteissue/${id}`,{method:"POST"})
    if(response.ok){
        toast.error('Issue Not Resolved',{
            autoClose:2000,
            position:'top-center'
        })
    }
  };
  useEffect(() => {
    getIssues();
  }, [handleResolved,handleNotResolved, deleteIssue]);

  return (
    <Container className="mt-4">
      <h2 className='font-serif text-center font-semibold underline my-12 text-5xl'>Issues</h2>
      {
        issues.length===0?<div className='text-center text-6xl'>No issues</div>:
      
        <Row>
        {issues.map((issue) => (
          <Col md={4} key={issue._id} className="mb-4 ">
            <Card >
              <Card.Body className={`${issue.Completed?`bg-green-500`:`bg-red-400`} rounded-lg`}>
                <Card.Title>Issue: {issue.Issue}</Card.Title>
                <Card.Text>
                  <strong>Person Name:</strong> {issue.Name}
                </Card.Text>
                <Card.Text>
                  <strong>Email :</strong> {issue.Email}
                </Card.Text>
                <Card.Text>
                  <strong>Bus Number:</strong> {issue.BusNumber}
                </Card.Text>
                {
                    issue.Completed?
                    <div className='text-center'>
                        
                    <Button onClick={()=>(deleteIssue(issue._id))} variant='success'>Delete</Button>
                    </div>
                    :
                    <div className='flex justify-evenly'>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => handleResolved(issue)}
                >
                  Resolved
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleNotResolved(issue._id)}
                >
                  Not Resolved
                </Button>
                </div>
                }
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      }
    </Container>
  );
}

export default Issue;
