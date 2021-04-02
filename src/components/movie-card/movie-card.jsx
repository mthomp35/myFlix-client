import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card bg='light' className='movie-card'>
        <Card.Img variant='top' src={movie.ImagePath} />  
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className='movie-card_text'>{movie.Description}</Card.Text>
        </Card.Body>
        <Card.Footer className='text-center'>
          <Button onClick={() => onClick(movie)} variant='link' block>Learn More</Button>
        </Card.Footer>
      </Card>
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};