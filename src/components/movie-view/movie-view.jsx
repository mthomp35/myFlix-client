import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Config from '../../config';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  // add movie to favorites
  addFav(movie) {
    const token = localStorage.getItem('token');
    console.log(token);
    console.log(localStorage.getItem('user'));
    axios.post(`${Config.API_URL}/users/${localStorage.getItem('user')}/Movies/${movie._id}`, {}, 
    {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response);
      alert(`${movie.Title} has been successfully added to your favorites.`);
      //window.open('/', '_self');
    })
    .catch(e => {
      console.log(`${e} error adding ${movie._id} to ${token}`);
      this.setState({
        message: 'Uh oh! Something went wrong! Please try again later.'
      });
    });
  }

  render() {
    const { movie, history } = this.props;
    
    if (!movie) return null;

    return (
     
      <Card className='movie-view'>
        <Button className='text-left' onClick={() => history.push('/')} variant='light' block>Return Home</Button>
        <Card.Img className='movie-poster left' src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className='movie-title'>{movie.Title}</Card.Title>
          <Card.Text className='movie-year'>
            <span className='label'>Release Year: </span>
            <span className='value'>{movie.Year}</span>
          </Card.Text>
          <Card.Text className='movie-description'>
            <span className='label'>Description: </span>
            <span className='value'>{movie.Description}</span>
          </Card.Text>

          <Card.Text className='movie-genre'>
            <span className='label'>Genre: </span>
            <span className='value'>{movie.Genre.Name}</span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </Card.Text>
          <Card.Text className='movie-director'>
            <span className='label'>Director: </span>
            <span className='value'>{movie.Director.Name}</span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director Details</Button>
            </Link>
          </Card.Text>
          <Card.Text className='movie-director-bio'>
            <span className='label'>Director Bio: </span>
            <span className='value'>{movie.Director.Bio}</span>
          </Card.Text>
        </Card.Body>
          <Button variant='warning' onClick={() => this.addFav(movie)}>Add to favorites</Button>
          <Button className='text-left' onClick={() => history.push('/')} variant='light' block>Return Home</Button>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    })
  }).isRequired,
};