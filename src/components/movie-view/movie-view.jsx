import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Config from '../../config';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  // get year from date
  getYear(movie) {
    let date = new Date(movie);
    let year = date.getFullYear();
    return year
  }

  // add movie to favorites
  addFav(movie) {
    const token = localStorage.getItem('token');
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
      <Row className='mv justify-content-center'>
        <Col md={4} className='mv-col col1'>
          <Card className='mv-card'>
            <Button variant='warning' onClick={() => this.addFav(movie)}>Add to favorites</Button>
            <Card.Img className='movie-img center' src={movie.ImagePath} />
          </Card>
        </Col>
        <Col md={4} className='mv-col col2'>
          <Card className='mv-card' bg='light'>
            <Card.Body>
              <Card.Title className='movie-title'>{movie.Title}</Card.Title>
              <Card.Text className='movie-year'>
                <span className='label'>Release Year: </span>
                <span className='value'>{this.getYear(movie.Year)}</span>
              </Card.Text>

              <Card.Text className='movie-description'>
                <span className='label'>Description: </span>
                <span className='value'>{movie.Description}</span>
              </Card.Text>

              <Card.Text className='movie-genre'>
                <span className='label'>Genre: </span>
                <span className='value'>{movie.Genre.Name}</span>
                <span>
                  <Link variant='link' to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>
                </span>
              </Card.Text>

              <Card.Text className='movie-director'>
                <span className='label'>Director: </span>
                <span className='value'>{movie.Director.Name}</span>
                <span>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director Details</Button>
                  </Link>
                </span>
              </Card.Text>
            </Card.Body>

            <Button variant='warning' onClick={() => this.addFav(movie)}>Add to favorites</Button>
            <br/>
            <Button className='btn-blk' variant='light' onClick={() => history.push('/')}>Return To Movies List</Button>
            
          </Card>
        </Col>
      </Row>
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