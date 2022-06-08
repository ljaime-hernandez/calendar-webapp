import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const NavBar = () => {

  const dispatch = useDispatch();
  // the useSelector will retrieve the user name from the authReducer to display it dynamically on the 
  // navbar
  const { name } = useSelector( state => state.auth );

  const handleLogout = () => {
    // the logout function will erase all information saved in the localStorage and store, for additional
    // information please refer to the auth action file
    dispatch(startLogout());
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">{name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto ">
            <button 
              className='btn btn-outline-danger'
              onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                &nbsp;&nbsp;Logout
            </button>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
  )
}
