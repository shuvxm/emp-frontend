import React, { useState } from "react";
import "./PostUser.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const PostUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // department:""
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // to call the api
      const response = await fetch("http://localhost:8080/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // to get the response
      const data = await response.json();
      console.log("Employee created: ", data);

      // to redirect the user to the dashboard so that user can see all the
      //  employee todo that we will use useNavigate from react router dom
      navigate("/");
    } catch (error) {
      console.log("Error creating employee: ", error.message);
    }
  };

  return (
    <div className="center-form">
      <h1>Create new employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* <Form.Group controlId='formBasicName'>
                <Form.Control 
                    type='text'
                    name='department'
                    placeholder='Enter department'
                    value={formData.department}
                    onChange={handleInputChange}
                />
            </Form.Group> */}

        <Form.Group controlId="formBasicName">
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </div>
  );
};
