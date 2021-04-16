import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Form, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    return(
      <div className='genre-view'>
        <Nav>

        </Nav>
        <div className='gv'>
          <div className='gv-name'>{genre.Name}</div>
          <div className='description'>{genre.Description}</div>
        </div>
      </div>
    );
  }
}

GenreView.PropTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  })
};