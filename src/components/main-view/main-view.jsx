import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import { moviesList } from '../../movies-list/movies-list';

import { Form, Nav, Navbar, Button, Col, Row } from 'react-bootstrap';
import Config from '../../config';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {
  // code executed right when the component is created in the memory, happens before "rendering" the component
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      token: null,
      message: 'Loading'
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      //Assign the result to the state
      this.setState({
        user: localStorage.getItem('user'),
        token: accessToken
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
    console.log('user', this.state.user);
    this.getMovies(authData.token);
  }

  onLogOut() {
    this.setState({
      user: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Thanks for visiting Movie Mania! You have successfully logged out.');
    window.open('/', '_self');
  }

  getMovies(token) {
    axios.get(`${Config.API_URL}/movies`, {
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
    const { movies, user, token, message } = this.state;

    //before the movies have been loaded
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
    //if (!movies.length) return <div className='main-view'>{message}</div>; <Row className='nav-bar_row' sticky='top' > <Row className='main-view justify-content-md-center'>
    return (
        <Router className='router-mv'>
        
            <Navbar bg='light' variant='light' expand='md' sticky='top' className='navbar'>
              <Navbar.Brand href='/'>M's</Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
              
                <Nav className='mr-auto' variant='light'/* how to add activeKey='' that changes with the page*/>
                  <Nav.Item className='nav-link'>
                    <Nav.Link href='/'>Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='nav-link'>
                    <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='nav-link justify-content-end'> 
                    <Nav.Link onClick={() => this.onLogOut()}>Log Out</Nav.Link>
                  </Nav.Item> 
                </Nav>
                <Form inline>
                  <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
          
        
        <Row className='main-view justify-content-md-center'>
          <Route exact path='/' render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
              if (!movies.length) return <div className='main-view'>{message}</div>;
              return movies.map(m => (
                <Col md={4} key={m._id}>
                  <MovieCard movie={m}/>
                </Col>
              ))
            }}/>
            
            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return <Col>
                <RegistrationView/>
              </Col>
            }}/>
            
            <Route path='/movies/:movieId' render={({match, history}) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
              if (!movies.length) return <div className='main-view'>{message}</div>;
              return <MovieView history={history} movie={movies.find(m => m._id === match.params.movieId)}/>
              }} />
            
            <Route path='/genres/:name' render={({match, history}) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
              if (!movies.length) return <div className='main-view'>{message}</div>;
              return <Col md={10}>
                <GenreView history={history} genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
              </Col>
            }} />
            
            <Route path='/directors/:name' render={({match, history}) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
              if (!movies.length) return <div className='main-view'>{message}</div>;
              return <DirectorView history={history} movies={movies.filter(m => m.Director.Name === match.params.name)} director={movies.find(m => m.Director.Name === match.params.name).Director}/>
              }} />
            </Row>
            <Route path='/users/:Username' render={(history) => <ProfileView movies={movies} history={history} onBackClick={() => history.goBack()}/>}/>
          
      </Router>
    );
  }
}