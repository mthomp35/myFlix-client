import React from 'react';
//import { MainView } from '../main-view/main-view';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
     
      <Card className='movie-view'>
        <Button className='text-left' onClick={() => onClick()} variant='light' block>Return Home</Button>
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
          </Card.Text>
          <Card.Text className='movie-director'>
            <span className='label'>Director: </span>
            <span className='value'>{movie.Director.Name}</span>
          </Card.Text>
          <Card.Text className='movie-director-bio'>
            <span className='label'>Director Bio: </span>
            <span className='value'>{movie.Director.Bio}</span>
          </Card.Text>
        </Card.Body>
          <Button className='text-left' onClick={() => onClick()} variant='light' block>Return Home</Button>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Year: PropTypes.number.isRequired, //note - this might need to be considered a string
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};