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
 
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    //let accessToken = this.props.token;
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

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

  // get user information based on username stored in local storage
  getUser(token) {
    console.log('this.props.user', this.props.user); //if I do it this way, I have to make the user log back in - can't navigate away and back unless I use localStorage
    axios.get(`https://best-flix-10922.herokuapp.com/users/${localStorage.user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('this is getuser');
      console.log(response); // should I pull this as one prop, then pull out the pieces when used?
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
      console.log(e),
      this.setState({
        message: 'We were unable to load your information.'
      });
    });
  };

  // remove movie from favorites - watchout -- if user can change username then code will break; create Config file for url vs hardcoding url, must export default to use it
  const removeFav = (movie) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://best-flix-10922.herokuapp.com/users/${this.props.user}/Movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response);
      alert(`${movie.Title} has been successfully removed from your favorites.`);

      // clone of favorite movies. the "..." spread operator allows you to clone an array
      let tempArray = [...this.state.favoriteMovies];
      tempArray.splice(tempArray.indexOf(movie._id), 1); //all array methods either mutate actual array or create new array
      this.setState({
        favoriteMovies: tempArray
      });
    })
    .catch(e => {
      console.log(e),
      this.setState({
        message: 'Sorry about that! Something went wrong while trying to remove a movie from your favorites.'
      });
    });
  }


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