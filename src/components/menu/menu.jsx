import React from 'react';
import { Nav, Navbar, Col, Container, Row } from 'react-bootstrap';

export default function Menu() {
  <Navbar bg='light' variant='light' expand='md' sticky='top' className='navbar'>
    {!user ? (
    <Navbar.Brand href='/'>M's</Navbar.Brand>
    ) : (
    <>
    <Navbar.Brand href='/'>M's</Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
    
      <Nav className='mr-auto' variant='light'/* how to add activeKey='' that changes with the page*/>
        <Nav.Item className='nav-link'>
          <Nav.Link href='/'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav-link'>
          <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav-link justify-content-end'> 
          <Nav.Link onClick={() => this.onLogOut()}>Log Out</Nav.Link>
        </Nav.Item> 
      </Nav>
    </Navbar.Collapse>
    </>
    )}
  </Navbar>
          
}