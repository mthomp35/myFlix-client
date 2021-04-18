import React from 'react';
import axios from 'axios';
import { Nav, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import {ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

export class MainView extends React.Component {
  // code executed right when the component is created in the memory, happens before "rendering" the component
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      message: 'Loading'
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      //Assign the result to the state
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function updates the `user` property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogOut() {
    this.setState({
      user: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Thanks for visiting! You have successfully logged out.')
  }

  getMovies(token) {
    axios.get('https://best-flix-10922.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
      this.setState({
        message: 'Something went wrong'
      });
    });
  }

  render() {
    //If the state isn't initialized, this will throw on runtime before the data is initially loaded
    const { movies, user, message } = this.state;

    //before the movies have been loaded
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
    if (!movies.length) return <div className='main-view'>{message}</div>;
    return (
      <Router>
        <div className='main-view'>
          <Route exact path='/' render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} user={user}/>)
            }
          }/>
          <Route path='/register' render={() => <RegistrationView/>} />
          <Route path='/movies/:movieId' render={({match, history}) => <MovieView history={history} movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route path='/genre/:name' render={({match}) => {
            if (!movies.length) return <div className='main-view'>{message}</div>;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
          } />
          <Route path='/directors/:name' render={({match}) => {
            if (!movies.length) return <div className='main-view'>{message}</div>;
            return <DirectorView movies={movies.filter(m => m.Director.Name === match.params.name)} director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
          } />
          <Route path='/users/:Username' render={() => <ProfileView user={user}/>} />
        </div>
      </Router>
    );
  }
}