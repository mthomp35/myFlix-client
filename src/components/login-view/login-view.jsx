import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group controlID='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control 
          type='text' 
          value={username}
          onChange={e => setUsername(e.target.value)} 
          placeholder='Enter username'
        />
      </Form.Group>
      
      <Form.Group controlID='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control 
          type='text'
          value={password}
          aria-describedby='passwordHelpBlock'
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter password'
        />
        <Form.Text id='passwordHelpBlock' muted>
          Password must contain: At least 10 characters, a combination of uppercase and lowercase letters (A-z), numbers (0-9), and special characters (e.g. ! @ # ? ]
        </Form.Text>
      </Form.Group>
      
      <Button type='submit' variant='secondary' onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};