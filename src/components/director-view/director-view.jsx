import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;
    //const directedMovies = movies.filter(m => m.Director.Name === director.Name);

    return (
      <div>
        <Row className='justify-content-center'>
        <Col md={10}>
          <div className='dv'>
            <div className='dv-name'>{director.Name}</div>
            <div className='dv-bio'>
              <span className='label'>Bio: </span>
              <span className='value'>{director.Bio}</span>
            </div>
            <div className='dv-birth'>
              <span className='label'>Date of Birth: </span>
              <span className='value'>{director.Birth}</span>
            </div>
            <div className='dv-death'>
              <span className='label'>Date of Death: </span>
              <span className='value'>{director.Death || 'N/A'}</span>
            </div>
            </div>       
        </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className='dv-movies'>
              <div className='label'>Movies directed by {director.Name}: </div>
              <div>
              {movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  })
};