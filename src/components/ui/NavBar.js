import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const NavBar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector( state => state.auth );

  const handleLogout = () => {
    dispatch(startLogout());
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">{name}</Navbar.Brand>
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
            <button 
              className='btn btn-outline-danger'
              onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                 Logout
            </button>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
  )
}
