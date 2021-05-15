import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div>
        <Card bg='light' className='movie-card text-center'>
          <Card.Img className='movie-card_img' variant='top' src={movie.ImagePath} />  
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text className='movie-card_text'>{movie.Description}</Card.Text>
          </Card.Body>
          <Link to={`/movies/${movie._id}`}>
            <Card.Footer className='text-center'>
              <Button variant='Link'>Learn More</Button>
            </Card.Footer>
          </Link>
        </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired
};