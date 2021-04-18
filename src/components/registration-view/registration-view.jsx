import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView(props) {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday , setBirthday ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
 

  const handleRegister = () => {
    e.preventDefault();
    console.log(firstName, lastName, username, password, email, birthday);
    axios.post('https://best-flix-10922.herokuapp.com/users', {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Birth: birthday,
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };

  return (
    <Form className='registration'>
      <h1>Welcome to Movie Mania!</h1>
      <p>Please register here to gain access.</p>
      <Form.Group controlId='formFirstName'>
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type='text'
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder='Enter First Name'
        />
      </Form.Group>
      
      <Form.Group controlId='formLastName'>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type='text'
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder='Enter Last Name'
          //srOnly='Enter Last Name'
        />
      </Form.Group>
      
      <Form.Group controlId='formEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Enter Email'
          //srOnly='Enter email address'
        />
      </Form.Group>
      
      <Form.Group controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='text'
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
          placeholder='Enter Date of Birth'
          //srOnly='Enter date of birth (month/day/year)'
        />
      </Form.Group>

      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Enter Username'
          //srOnly='Enter username'
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
          //srOnly='Enter password'
        />
        <Form.Text id='passwordHelpBlock'>
          Password must contain: At least 10 characters, a combination of uppercase and lowercase letters (A-z), 
          numbers (0-9), and special characters (e.g. ! @ # ? ] ).
        </Form.Text>
      </Form.Group>

      <Form.Group controlId='formConfirmPassword'>
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
          type='password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
          //srOnly='Re-enter password to confirm'
        />
      </Form.Group>

      <Button type='submit' variant='secondary' onClick={handleRegister}>Submit</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired, //note - this might need to be considered a string
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func.isRequired
};