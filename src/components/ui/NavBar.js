import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="/">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="/">
                Dank memes
            </Nav.Link>
            <button className='btn btn-outline-danger'>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                Logout
            </button>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}
