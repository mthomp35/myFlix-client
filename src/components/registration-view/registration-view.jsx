import React, { useState } from 'react';

import './registration-view.scss';

export function RegistrationView(props) {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday , setBirthday ] = useState('');

  const handleRegistration = () => {
    e.preventDefault();
    console.log(firstName, lastName, username, password, email, birthday);
    props.onRegistration(register);
  };

  return (
    <form>
      <label>
        First Name:
        <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type='text' value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <label>
        Username:
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type='text' value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type='text' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      </label>
      <button type='submit' onClick={handleRegistration}>Submit</button>
    </form>
  );
}