import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const apiurl = "http://localhost:8080/employees";
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(apiurl);
        const result = await response.json();
        setEmployees(result.body);
      } catch (error) {
        console.log("Error fetching employees: ", error);
      }
    };
    fetchEmployees();
  }, []);

  // Function to add a new employee to the current employee list
  // const addEmployee = (newEmployee) => {
  //   setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  // };

  const handleDelete = async (employeeId) =>{
    try {
      const response = await fetch(`${apiurl}/${employeeId}`, {
        method: "DELETE",
      });

      if(response.ok){
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeId)
        )
      }
      console.log(`Employee with ID ${employeeId} deleted successfully`);

    } catch (error) {
      console.log("Error deleting employee: ", error.message);
    }
  }

  const handleUpdate = (employeeId) =>{
    navigate(`/employee/${employeeId}`)
  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center head">Employees</h1>

            <div className="table-container">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.length > 0 ? (
                    employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={
                                employee.profileImage ||
                                "https://via.placeholder.com/50"
                              } // Default image if none exists
                              alt={`${employee.name}'s profile`}
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                marginRight: "50px",
                              }}
                            />
                            <span>{employee.name}</span>
                          </div>
                        </td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.password}</td>
                        <td>
                          <Button variant="outline-secondary" onClick={()=>handleUpdate(employee.id)}>Update</Button>{" "}
                          <Button variant="outline-danger" onClick={()=>handleDelete(employee.id)}>Delete</Button>{" "}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No employees found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
