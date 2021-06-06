import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { Col, Container, Row } from 'react-bootstrap';
import Config from '../../config';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import Menu from '../menu/menu';
import { ScrollToTop } from '../scroll/scrollToTop';

import './main-view.scss';

class MainView extends React.Component {
  // code executed right when the component is created in the memory, happens before "rendering" the component
  constructor() {
    super();

    this.state = {
      message: 'Loading'
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function updates the `user` property state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  //onLogOut is being passed to a child, so can no longer be a regular function. Must be arrow function to preserve meaning of "this", otherwise "this.props" will return "undefined"
  onLogOut = () => {
    this.props.setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Thanks for visiting Movie Mania! You have successfully logged out.');
  }

  getMovies(token) {
    axios.get(`${Config.API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to setMovies
      this.props.setMovies(response.data);
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
    const { message } = this.state;
    const { movies, user } = this.props;

    //before the movies have been loaded
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
    //if (!movies.length) return <div className='main-view'>{message}</div>; <Row className='nav-bar_row' sticky='top' > <Row className='main-view justify-content-md-center'>
    return (
      <Router className='router-mv'>

        <Menu onLogOut={this.onLogOut}/>

        <Container fluid className='cont-mv'>
        <ScrollToTop />
          <Row className='main-view justify-content-md-center'>
            <Route exact path='/' render={() => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>
                if (!movies.length) return <div className='main-view'>{message}</div>
                return <MoviesList/>
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
                <GenreView history={history} movies={movies.filter(m => m.Genre.Name === match.params.name)} genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
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
          <Route path='/users/:Username' render={(history) => <ProfileView history={history} movies={movies}/>}/>
        </Container>
      </Router>
    );
  }
}
//onBackClick={() => history.goBack()}
let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);