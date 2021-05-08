import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

// does this need to be a class?
export class ProfileView extends React.Component {
    // must declare state without "this." but must refer to state as "this.state"
    state = {
      FirstName: '',
      LastName: '',
      Email: '',
      DOB: '',
      Username: '',
      Password: '',
      ConfirmPassword: 'bettygotskills23',
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

  updateProfile() {
    e.preventDefault();
    //add something to ask if user is sure they want to update their profile
    axios.put(`https://best-flix-10922.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}`},
      data: {
        FirstName: newFirstName ? newFirstName : this.state.FirstName,
        LastName: newLastName ? newLastName : this.state.LastName,
        Email: newEmail ? newEmail : this.state.Email,
        Birth: newDOB ? newDOB : this.state.Birth,
        Password: newPassword ? newPassword : this.state.Password
      }
    })
    .then(response => {
      console.log(response);
      this.setState({
        FirstName: response.data.FirstName,
        LastName: response.data.LastName,
        Email: response.data.Email,
        DOB: response.data.Birth,
        Password: response.data.Password
      });
      alert('Great work! You have successfully updated your profile!');
      // send Email to user saying changes have been made to their profile. If they made them, then disregard. otherwise contact us and change their password
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
    axios.delete(`https://best-flix-10922.herokuapp.com/users/${Username}`, {
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
    const { FirstName, LastName, Email, DOB, Username, Password, ConfirmPassword, favoriteMovies, updateProfile } = this.state;
    const { movies, history } = this.props;
    const favMovies = movies.filter(movie => favoriteMovies.includes(movie._id));
    console.log(movies);
    console.log(Username);

    return(
      <div>
        <p>{`Hi ${FirstName}}! Enter new details below to edit your profile.`}</p>
        <Form className='update-profile'>
          <Form.Group controlId='formFirstName'>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type='text'
              value={FirstName}
              onChange={e => setFirstName(e.target.value)}
              //placeholder={FirstName}
            />
          </Form.Group>
      
          <Form.Group controlId='formLastName'>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type='text'
              value={LastName}
              onChange={e => this.setLastName(e.target.value)}
              placeholder=''
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
              type='text'
              value={DOB}
              onChange={e => setDOB(e.target.value)}
              placeholder='Enter Date of Birth'
              pattern='Enter date of birth (month/day/year)'
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
              sr_only='Re-enter password to confirm'
            />
          </Form.Group>

          <Button type='submit' variant='secondary' onClick={updateProfile}>Submit</Button>
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