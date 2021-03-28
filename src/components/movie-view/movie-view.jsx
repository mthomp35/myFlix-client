import React from 'react';
import { MainView } from '../main-view/main-view';
import PropTypes from 'prop-types';

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
      <div className='movie-view'>
        <img className='movie-poster' src={movie.ImagePath} />
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'>{movie.Title}</span>
        </div>
        <div className='movie-year'>
          <span className='label'>Release Year: </span>
          <span className='value'>{movie.Year}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'>{movie.Description}</span>
        </div>

        <div className='movie-genre'>
          <span className='label'>Genre: </span>
          <span className='value'>{movie.Genre.Name}</span>
        </div>
        <div className='movie-director'>
          <span className='label'>Director: </span>
          <span className='value'>{movie.Director.Name}</span>
        </div>
        <div className='movie-director-bio'>
          <span className='label'>Director Bio: </span>
          <span className='value'>{movie.Director.Bio}</span>
        </div>
        <div>
        <button className='home-button' onClick={() => onClick()}>Home</button>
        </div>
        
      </div>
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