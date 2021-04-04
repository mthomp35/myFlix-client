import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username, password);
  };

  return (
    <Form className='login'>
      <Form.Row>
        <h1>Welcome to Movie Mania!</h1>
      </Form.Row>
      <Form.Row>
        <p>Please log in to to continue.</p>
      </Form.Row>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control 
          type='text' 
          value={username}
          onChange={e => setUsername(e.target.value)} 
          placeholder='Enter Username'
        />
      </Form.Group>
      
      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control 
          type='password'
          value={password}
          aria-describedby='passwordHelpBlock'
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter Password'
        />
        <Form.Text id='passwordHelpBlock'>
          Password must contain: At least 10 characters, a combination of uppercase and lowercase letters (A-z), numbers (0-9), and special characters (e.g. ! @ # ? ] ).
        </Form.Text>
      </Form.Group>
      <Form.Row>
        <Col md={6}>
          <Button type='submit' variant='secondary' onClick={handleSubmit}>Submit</Button>
        </Col>
        <Col md={6}>
          <Button type='button' variance='link'>New to Movie Mania? Click here to register (Reminder: link this to log in registration page)</Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};