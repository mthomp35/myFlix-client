import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Row} from 'react-bootstrap';
import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;

    return(
      <div className='genre-view'>
        <div className='gv'>
          <h2 className='gv-name'>{genre.Name}</h2>
          <p className='gv-txt'>{genre.Description}</p>
        </div>
        <Row md={5}>
          {movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}
        </Row>
      </div>
    );
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  })
};