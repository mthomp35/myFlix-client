import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Form, Button } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();
    
    this.state = {
      user: user
    };
  }

  getProfile() {
    axios.get('https://best-flix-10922.herokuapp.com/users/:Username', {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Birth: birthday,
      Username: username,
      Password: password,
      FavoriteMovies: []
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error getting user data')
    });
  };

  render() {
    const { user } = this.props;

    return(
      <div>
        <div>
          <span>First Name: </span>
          <span>{user.FirstName}</span>
        </div>
        <div>
          Change your password
          <div>
            Current password:
          </div>
          <div>
            New password:
          </div>
          <div>
            Re-enter new password:
          </div>
        </div>
      </div>
    );
  }
}