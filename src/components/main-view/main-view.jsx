import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';

export class MainView extends React.Component {
  // code executed right when the component is created in the memory, happens before "rendering" the component
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount(){
    axios.get('https://best-flix-10922.herokuapp.com/movies')
    .then(response => {
      //Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  // when home button is clicked, this function sets selectedMovie state back to "null", re-rendering the DOM and bringing user back to main-view
  onHomeClick() {
    this.setState({
      selectedMovie: null
    });
  }

  // when movie is clicked, this function sets selectedMovie state "movie", re-rendering the DOM and bringing up movie-view
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // When a user successfully logs in, this function updates the `user` property in state to that particular user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // 
  onRegister(register) {
    this.setState({
      register
    });
  }

  render() {
    //If the state isn't initialized, this will throw on runtime
    //before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />;

    //before the movies have been loaded
    if (!movies) return <div className='main-view'/>;
    return (
      <Row className='justify-content-md-center'>
        { selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onClick={() => this.onHomeClick()}/>
            </Col>
          )
          : movies.map(movie => (
            <Col md={4}>
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
            </Col>
          ))
        }
      </Row>
    );
  }
}