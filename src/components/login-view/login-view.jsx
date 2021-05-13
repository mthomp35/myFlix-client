import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Col, Form } from 'react-bootstrap';
import Config from '../../config';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    // prevent default behavior when submitting a form
    e.preventDefault();
    // Send a request to the server for authentication
    console.log(username, password);
    axios.post(`${Config.API_URL}/login`, {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log(e + 'User does not exist')
    });
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
          <Link to={'/register'}>
            <Button type='button' variance='link'>New to Movie Mania? Click here to register</Button>
          </Link>
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