import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

function Menu(props) {
  const { user, onLogOut } = props;
  let history = useHistory();

  function onLogOutHandler() {
    onLogOut();
    history.push('/');
  }

  return(
    <Navbar bg='light' variant='light' expand='md' sticky='top' className='navbar'>
      {!user ? (
      <Navbar.Brand href='/'>M's</Navbar.Brand>
      ) : (
      <>
      <Navbar.Brand href='/'>M's</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
      
        <Nav className='mr-auto' variant='light'>
          <Nav.Item className='nav-link'>
            <Nav.Link href='/'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item className='nav-link'>
            <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item className='nav-link justify-content-end'> 
            <Nav.Link onClick={onLogOutHandler}>Log Out</Nav.Link>
          </Nav.Item> 
        </Nav>
      </Navbar.Collapse>
      </>
      )}
    </Navbar>
  )
}

export default connect(mapStateToProps)(Menu);