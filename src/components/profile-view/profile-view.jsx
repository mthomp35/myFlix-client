import React from 'react';
import axios from 'axios';
import Config from '../../config';
import { Link } from 'react-router-dom';

import { Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import './profile-view.scss';

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
      ConfirmPassword: '',
      favoriteMovies: [],
      message: 'Loading'
    };

  setNew(key, value) {
    let obj = {};
    obj[key] = value; //must use array syntax to access prop because it's a variable
    this.setState(obj)
  }

  /* used to change date to correct format when retrieved as UTC format. Updated backend to make date a string and prevent errors when different date styles get sent to client - keep this as reference
  changeDate(string) {
    return string ? string.slice(0,string.indexOf('T')) : '1111-11-11';
  } */

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  // get user information based on username stored in local storage
  getUser() {
    //if I use this.props.user, I have to make the user log back in - can't navigate away and back unless I use localStorage
    axios.get(`${Config.API_URL}/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      console.log('this is getUser');
      console.log(`username ${this.state.Username}`);
      console.log(response); // should I pull this as one prop, then pull out the pieces when used?
      let data = response.data;
      this.setState({
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.Email,
        DOB: data.Birth,
        Username: data.Username,
        favoriteMovies: data.FavoriteMovies
      });
      console.log(this.state.Username);
    })
    .catch(e => {
      console.log(e),
      this.setState({
        message: 'We were unable to load your information.'
      });
    });
  }

  // remove movie from favorites - watchout -- if user can change username then code will break; create Config file for url vs hardcoding url, must export default to use it
  removeFav(fav) {
    axios.delete(`${Config.API_URL}/users/${localStorage.getItem('user')}/Movies/${fav._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      console.log(response);
      alert(`${fav.Title} has been successfully removed from your favorites.`);

      // clone of favorite movies. the "..." spread operator allows you to clone an array
      let tempArray = [...this.state.favoriteMovies];
      tempArray.splice(tempArray.indexOf(fav._id), 1); //all array methods either mutate actual array or create new array
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

  updateProfile = (e) => {
    e.preventDefault(); //need to define the 'e' as prop to prevent page refresh
    //need the arrow function for 'this' to look at the 'class' instead of the 'form / last thing it was looking at' -->reco decouple then put into axios
    //add something to ask if user is sure they want to update their profile
    
    let data = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Username: this.state.Username,
      Birth: this.state.DOB
    }
    if(this.state.Password === this.state.ConfirmPassword && this.state.Password !== '') {
      data.Password = this.state.Password
    } else if(this.state.Password !== this.state.ConfirmPassword){
      alert('Your passwords do not match');
      return; //put statement will never get hit after the return statement
    }

    axios.put(`${Config.API_URL}/users/${this.state.Username}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
    })
    .then(response => {
      console.log(response);
      this.setState({
        FirstName: response.data.FirstName,
        LastName: response.data.LastName,
        Email: response.data.Email,
        DOB: response.data.Birth,
        Password: '',
        ConfirmPassword: ''
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
    axios.delete(`${Config.API_URL}/users/${this.state.Username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      console.log(response);
      localStorage.clear();
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
    const { FirstName, LastName, Email, DOB, Password, ConfirmPassword, favoriteMovies } = this.state;
    const { movies, history } = this.props;
    const favMovies = movies.filter(movie => favoriteMovies.includes(movie._id));

    //utilize <> as <React.Fragment> to wrap profile
    return(
      <>
        <Container fluid className='form'>
          <Row className='form-rw'>
            <h3>{`Hi ${FirstName}! Enter new details below to edit your profile.`}</h3>
            <Col className='form-col' md={12}>
            
            <Form className='update-profile'>
              <Form.Group controlId='formFirstName'>
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type='text'
                  value={FirstName}
                  onChange={e => this.setNew('FirstName', e.target.value)}
                />
              </Form.Group>
          
              <Form.Group controlId='formLastName'>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type='text'
                  value={LastName}
                  onChange={e => this.setNew('LastName', e.target.value)}
                />
              </Form.Group>
              
              <Form.Group controlId='formEmail'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='Email'
                  value={Email}
                  onChange={e => this.setNew('Email', e.target.value)}
                />
              </Form.Group>
              
              <Form.Group controlId='formDOB'>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type='date'
                  value={DOB}
                  onChange={e => this.setNew('DOB', e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='Password'
                  value={Password}
                  aria-describedby='passwordHelpBlock'
                  onChange={e => this.setNew('Password', e.target.value)}
                  placeholder='Enter New Password'
                />
                <Form.Text id='passwordHelpBlock'>
                  Password must contain: At least 10 alphanumeric characters.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId='formConfirmPassword'>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type='Password'
                  value={ConfirmPassword}
                  onChange={e => this.setNew('ConfirmPassword', e.target.value)}
                  placeholder='Confirm Password'
                  sr_only='Re-enter password to confirm'
                />
              </Form.Group>
              <Form.Row>
                <Col md={4}>
                  <Button className='form-btn' type='submit' variant='secondary' onClick={this.updateProfile}>Update Profile</Button>
                </Col>
                <Col md={{ span: 3, offset: 5 }}>
                  <Button className='form-btn' variant='danger' onClick={() => this.deleteUser()}>Delete account</Button>
                </Col>
              </Form.Row>
            </Form>
            </Col>
          </Row>
        </Container>
        
        <Container fluid className='fav'>
          <Row className='fav-rw_1'>
            <p className='fav-label'>Your Favorite Movies:</p>
          </Row>
          <Row className='justify-content-sm-start fav-rw_2'>
            {favMovies.map((fav, index) => {
              if(!favMovies) return <p className='no-fav'>You have no favorite movies. Go add some!</p>;
              return(
                <Card className='fav-cd' style={{ width: '12rem' }} key={index}>
                  <Link to={`/movies/${fav._id}`}>
                    <Card.Img className='fav-mv' variant='top' src={fav.ImagePath} />
                  </Link>
                    <Button className='text-center' variant='light' onClick={() => this.removeFav(fav)}>Remove movie</Button>
                </Card>
              )
            }
            )}
          </Row>
        </Container>

        <Container>
          <Row className='buttons'>
            <Col md={4}>
              <Button variant ='warning' onClick={() => history.push('/')}>Go back</Button>
            </Col>
          </Row>
        </Container>
      </>
      
    );
  }
}