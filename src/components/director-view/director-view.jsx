import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;
    const directedMovies = movies.filter(m => m.Director.Name === movie.Director.Name);

    return (
      <div className='director-view'>
        <Nav>

        </Nav>
        <div className='dv'>
          <div className='dv-name'>{movie.Director.Name}</div>
          <div className='dv-bio'>
            <span className='label'>Bio: </span>
            <span className='value'>{movie.Director.Bio}</span>
          </div>
          <div className='dv-birth'>
            <span className='label'>Date of Birth: </span>
            <span className='value'>{movie.Director.Birth}</span>
          </div>
          <div className='dv-death'>
            <span className='label'>Date of Death: </span>
            <span className='value'>{movie.Director.Death || '[N/A]'}</span>
          </div>       
          <div className='dv-movies'>
            <span className='label'>Movies directed by {movie.Director.Name}: </span>
            <div>
            {directedMovies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}