import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export class ProfileView extends React.Component {
    // must declare state without "this." but must refer to state as "this.state"
    state = {
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      username: '',
      password: '',
      confirmPassword: 'bettygotskills23',
      favoriteMovies: [],
      message: 'Loading'
    };

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
    console.log('this.props.user', this.props.user); //if I do it this way, I have to make the user log back in - can't navigate away and back unless I use localStorage
    axios.get(`https://best-flix-10922.herokuapp.com/users/${localStorage.user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('this is getuser');
      console.log(response); // should I pull this as one prop, then pull out the pieces when used?
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
      console.log(e),
      this.setState({
        message: 'We were unable to load your information.'
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
      console.log(e),
      this.setState({
        message: 'Sorry about that! Something went wrong while trying to remove a movie from your favorites.'
      });
    });
  }

  editProfile() {
    //add something to ask if user is sure they want to update their profile
    axios.post(`https://best-flix-10922.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response);
      alert('Great work! You have successfully updated your profile!');
      // send email to user saying changes have been made to their profile. If they made them, then disregard. otherwise contact us and change their password
      //do I need to set states to null?
    })
    .catch(e => {
      console.log(e);
      this.setState({
        message: 'Uh oh! Something went wrong when we tried to update your profile.'
      });
    });
  }

  deleteUser() {
    //We hate to see you go but we understand. You are about to delete your account. All of your information will be lost. are you sure you want to delete your account?
    axios.delete(`https://best-flix-10922.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response);
      alert('Your account has been successfully deleted');
      window.open('/register', '_self');
    })
    .catch(e => {
      console.log(e);
      this.setState({
        message: 'Uh oh! Something went wrong when we tried to delete your profile. Please try again or contact us if the issue persists'
      });
    });
  }

  render() {
    const { firstName, lastName, email, dob, username, password, confirmPassword, favoriteMovies, history, editProfile } = this.state;
    const { movies } = this.props;
    const favMovies = movies.filter(movie => favoriteMovies.includes(movie._id));
    console.log(movies);
    console.log(username);

    return(
      <div>
        <Form className='update-profile'>
          <p>{`Hi ${firstName}}! Enter new details below to edit your profile.`}</p>
          <Form.Group controlId='formFirstName'>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type='text'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              //placeholder={firstName}
            />
          </Form.Group>
      
          <Form.Group controlId='formLastName'>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type='text'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder=''
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
            />
          </Form.Group>
          
          <Form.Group controlId='formBirthday'>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type='text'
              value={dob}
              onChange={e => setBirthday(e.target.value)}
              placeholder='Enter Date of Birth'
              pattern='Enter date of birth (month/day/year)'
            />
          </Form.Group>

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
              sr_only='Re-enter password to confirm'
            />
          </Form.Group>

          <Button type='submit' variant='secondary' onClick={editProfile}>Submit</Button>
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
        <Button onClick={() => this.deleteUser()}>Delete account</Button>
      </div>
    );
  }
}