import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export class ProfileView extends React.Component {
  constructor() {
    super();
    
    this.state = {
      firstName: null,
      lastName: '',
      email: '',
      dob: '',
      username: '',
      password: '',
      favoriteMovies: [],
      movies: [],
      message: 'Loading'
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
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
    const url = 'https://best-flix-10922.herokuapp.com/users/'+localStorage.getItem('user');
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
        message: 'Something went wrong'
      });
    });
  }

  // remove movie from favorites
  removeFav(movies) {
    const token = localStorage.getItem('token');
    axios.delete('https://best-flix-10922.herokuapp.com/users/'+localStorage.getItem('user')+'/Movies/'+movies._id, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response);
      alert(`${movies.Title} has been successfully removed from your favorites.`);
      this.componentDidMount();
    })
    .catch(e => {
      console.log(e + ' error deleting movie'),
      this.setState({
        message: 'Something went wrong'
      });
    });
  }

  render() {
    const { firstName, lastName, email, dob, username, password, favoriteMovies, movies } = this.state;

    return(
      <div>
        <div>
          <span>First Name: {firstName}</span>
        </div>
        <div>
          <span>Username: {username}</span>
        </div>
        <div>
          Change your password
          <div>
            Current password:
          </div>
          <div>
            New password:
          </div>
          <div>
            Re-enter new password:
          </div>
        </div>
        <div>{movies.ImagePath}</div>
      </div>
    );
  }
}