import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export class ProfileView extends React.Component {
  //constructor() {
    //super();
    // must declare state without "this." but must refer to state as "this.state"
    state = {
      firstName: null,
      lastName: '',
      email: '',
      dob: '',
      username: '',
      password: '',
      favoriteMovies: [],
      message: 'Loading'
    };

  //}

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    //let accessToken = this.props.token;
    if (accessToken !== null) {
      //Assign the result to the state
      /*this.setState({
        user: localStorage.getItem('user'),
        token: accessToken
      });*/
      this.getUser(accessToken);
    }
  }

  // get user information based on username stored in local storage
  getUser(token) {
    const url = `https://best-flix-10922.herokuapp.com/users/${this.props.user}`;
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response);
      this.setState({
        firstName: response.data.FirstName,
        lastName: response.data.LastName,
        email: response.data.Email,
        dob: response.data.Birth,
        username: response.data.Username,
        password: response.data.Password,
        favoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(e => {
      console.log(e + ' error getting user data'),
      this.setState({
        message: 'Something went wrong while retrieving your data.'
      });
    });
  }

  // remove movie from favorites - watchout -- if user can change username then code will break; create Config file for url vs hardcoding url, must export default to use it
  removeFav(movie) {
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
      console.log(e + ' error deleting movie'),
      this.setState({
        message: 'Sorry about that! Something went wrong while trying to remove a movie from your favorites.'
      });
    });
  }

  editProfile() {

  }

  render() {
    const { firstName, lastName, email, dob, username, password, favoriteMovies, history } = this.state;
    const { movies } = this.props;
    const favMovies = movies.filter(movie => favoriteMovies.includes(movie._id));
    console.log(movies);

    return(
      <div>
        <Form className='update-profile'>
          <p>Edit ${username} profile information.</p>
          <Form.Group controlId='formFirstName'>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type='text'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder={this.props.firstName}
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
        <div>Favorite Movies:
          {favMovies.map((fav, index) => {
            return(
            <div key={index}>
              <img src={fav.ImagePath}/>
              <Button onClick={() => this.removeFav(fav)}>Remove movie</Button>
            </div>
            )
          }
          )}
        </div>
        <Button onClick={() => history.push('/')}>Go back</Button>
      </div>
    );
  }
}