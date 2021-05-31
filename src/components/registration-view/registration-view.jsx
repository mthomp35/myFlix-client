import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Config from '../../config';

import './registration-view.scss';

export function RegistrationView() {
  const [ FirstName, setFirstName ] = useState(''); //array destructuring - let's learn more about that
  const [ LastName, setLastName ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ DOB , setDOB ] = useState('');
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ ConfirmPassword, setConfirmPassword ] = useState('');
 

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(FirstName, LastName, Username, Password, Email, DOB);
    let regData = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Birth: DOB,
      Username: Username
    }
    if(Password === ConfirmPassword && Password !== '') {
      regData.Password = Password
    } else if(Password !== ConfirmPassword) {
      alert('Your passwords must match and cannot be blank');
      return; //put statement will never get hit after the return statement
    }
    axios.post(`${Config.API_URL}/users`, regData
    )
    .then(response => {
      const data = response.data;
      console.log(data);
      alert('Thank you for registering. Please log in using your username and password.');
      window.open('/', '_self'); // the argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };

  return (
    <Form className='registration'>
      <h1>Welcome to M's Movie Mania!</h1>
      <p>Please register here to access the site.</p>
      <p>
        <Link className='login-link' to={'/'}>Already registered? Login here.</Link>
      </p>
      <Form.Group controlId='formFirstName'>
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type='text'
          value={FirstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder='Enter First Name'
        />
      </Form.Group>
      
      <Form.Group controlId='formLastName'>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type='text'
          value={LastName}
          onChange={e => setLastName(e.target.value)}
          placeholder='Enter Last Name'
          //srOnly='Enter Last Name'
        />
      </Form.Group>
      
      <Form.Group controlId='formEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='Email'
          value={Email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Enter Email'
        />
      </Form.Group>
      
      <Form.Group controlId='formDOB'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='date'
          value={DOB}
          onChange={e => setDOB(e.target.value)}
          placeholder='Enter Date of Birth'
        />
      </Form.Group>

      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={Username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Enter Username'
        />
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='Password'
          value={Password}
          aria-describedby='passwordHelpBlock'
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter Password'
        />
        <Form.Text id='passwordHelpBlock'>
          Password must contain at least 10 characters.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId='formConfirmPassword'>
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
          type='Password'
          value={ConfirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
          sr_only='Re-enter password to confirm'
        />
      </Form.Group>
      <Form.Group className='btn-blk'>
       <Button type='submit' variant='secondary' onClick={handleRegister}>Submit</Button>
      </Form.Group>
    </Form>
  );
}

// Ideal password requirements: Password must contain: At least 10 characters, a combination of uppercase and lowercase letters (A-z), numbers (0-9), and special characters (e.g. ! @ # ? ] ).

RegistrationView.propTypes = {
  register: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    DOB: PropTypes.instanceOf(Date).isRequired, //note - this might need to be considered a string
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    ConfirmPassword: PropTypes.string.isRequired
  }),
  //handleRegister: PropTypes.func.isRequired
};