import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Correct import
import './Header.css';

export const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/"><strong>Employee Management System</strong></Navbar.Brand> {/* Wrapping Navbar.Brand with Link */}
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Employees</Nav.Link>
            <Nav.Link as={Link} to="/employee" className="nav-link">Create Employee</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
