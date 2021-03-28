import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return (
    <form>
      <label>
        Username:
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type='text' value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type='submit' onClick={handleSubmit}>Submit</button>
    </form>
  );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};