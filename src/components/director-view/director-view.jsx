import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';
import { propTypes } from 'react-bootstrap/esm/Image';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;
    //const directedMovies = movies.filter(m => m.Director.Name === director.Name);

    return (
      <div className='director-view'>
        <Nav>

        </Nav>
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
            <span className='value'>{director.Death || '[N/A]'}</span>
          </div>       
          <div className='dv-movies'>
            <span className='label'>Movies directed by {director.Name} (maybe just the movie image?): </span>
            <div>
            {movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}
            </div>
          </div>
        </div>
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