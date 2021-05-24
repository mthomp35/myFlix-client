import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
  
        <Card bg='light' className='movie-card text-center'>
          <Card.Img className='movie-img' variant='top' src={movie.ImagePath} />  
          <Card.Body>
            <Card.Title className='movie-title'>{movie.Title}</Card.Title>
          </Card.Body>
          <Link to={`/movies/${movie._id}`}>
            <Card.Footer className='text-center btn-blk'>
              <Button variant='Link'>Learn More</Button>
            </Card.Footer>
          </Link>
        </Card>
      
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};