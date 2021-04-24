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

  render() {
    const { firstName, lastName, email, dob, username, password, favoriteMovies, history } = this.state;
    const { movies } = this.props;
    const favMovies = movies.filter(movie => favoriteMovies.includes(movie._id));
    console.log(movies);

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
        <div> Favorite Movies:
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