import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;

    return (
      <div className='dv'>
        <div className='dv-info'>
        <h3 className='dv-name'>{director.Name}</h3>
          <div className='dv-bio'>
            <span className='label'>Bio: </span>
            <span className='value'>{director.Bio}</span>
          </div>
          <div className='dv-birth'>
            <span className='label'>Date of Birth: </span>
            <span className='value'>{director.Birth || 'N/A'}</span>
          </div>
          <div className='dv-death'>
            <span className='label'>Date of Death: </span>
            <span className='value'>{director.Death || 'N/A'}</span>
          </div>
        </div>
        <p className='dv-movies-label'>Movies directed by {director.Name}: </p>
        <Row className='dv-movies' md={5}>
          {movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}
        </Row>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  })
};