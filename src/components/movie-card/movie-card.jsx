import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Card, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, user } = this.props;

    return (
      <div>
        <Nav>
          <Nav.Item>
            <Nav.Link href='/'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`/users/:${user}`}>Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Loggout</Nav.Link>
          </Nav.Item>
        </Nav>
        <Card bg='light' className='movie-card'>
          <Card.Img variant='top' src={movie.ImagePath} />  
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text className='movie-card_text'>{movie.Description}</Card.Text>
          </Card.Body>
          <Card.Footer className='text-center'>
            <Link to={`/movies/${movie._id}`}>
              <Button variant='Link'>Learn More</Button>
            </Link>
          </Card.Footer>
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