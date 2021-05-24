import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className='main-view'>Oh no! Where did all the movies go?</div>;

  return <>
    <Col md={12} style={{margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} className='vf'/>
    </Col>
    {filteredMovies.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))};
    </>
  }

export default connect(mapStateToProps)(MoviesList);