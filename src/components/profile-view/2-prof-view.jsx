import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

// does this need to be a class?
export function ProfileView() {
  const [ FirstName, setFirstName ] = useState('');
  const [ LastName, setLastName ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ DOB , setDOB ] = useState('');
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ ConfirmPassword, setConfirmPassword ] = useState('');

  const updateProfile = () => {
    e.preventDefault();
    console.log(FirstName, LastName, Username, Password, Email, DOB);
    axios.put(`https://best-flix-10922.herokuapp.com/users/${localStorage.user}`, {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Birth: DOB,
      Username: Username,
      Password: Password
    }, { 
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //const data = response.data;
      console.log(data);
      this.setState({
        FirstName: response.data.FirstName,
        LastName: response.data.LastName,
        Email: response.data.Email,
        DOB: response.data.Birth,
        Username: response.data.Username,
        Password: response.data.Password,
        favoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(e => {
      console.log(`${e} error registering the user`)
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
          value={FirstName}
          onChange={e => setFirstName(e.target.value)}
          //placeholder='Enter First Name'
        />
      </Form.Group>
      
      <Form.Group controlId='formLastName'>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type='text'
          value={LastName}
          onChange={e => setLastName(e.target.value)}
          //placeholder='Enter Last Name'
          //srOnly='Enter Last Name'
        />
      </Form.Group>
      
      <Form.Group controlId='formEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='Email'
          value={Email}
          onChange={e => setEmail(e.target.value)}
          //placeholder='Enter Email'
          //srOnly='Enter email address'
        />
      </Form.Group>
      
      <Form.Group controlId='formDOB'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='text'
          value={DOB}
          onChange={e => setDOB(e.target.value)}
          //placeholder='Enter Date of Birth'
          //srOnly='Enter date of birth (month/day/year)'
        />
      </Form.Group>

      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={Username}
          onChange={e => setUsername(e.target.value)}
          //placeholder='Enter Username'
          //srOnly='Enter Username'
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
          type='Password'
          value={ConfirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
          //srOnly='Re-enter password to confirm'
        />
      </Form.Group>

      <Button type='submit' variant='secondary' onClick={updateProfile}>Submit</Button>
    </Form>
  );
}