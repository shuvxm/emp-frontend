import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UpdateUser.css";

export default function UpdateUser() {
  const apiurl = "http://localhost:8080/employees";
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    axios.get(`${apiurl}/${id}`)
      .then((response) => {
        setEmployee(response.data.body);
        setLoad(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, apiurl]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiurl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      const data = await response.json();
      console.log("User updated:", data);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <>
      {load && (
        <div className="center-form">
          <h1>Edit employee</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={employee.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={employee.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone"
                value={employee.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="text"
                name="password"
                placeholder="Enter password"
                value={employee.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Edit Employee
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}
