import React, { useState, useContext } from 'react';

// auth context object
import { Context as AuthContext } from '../context/auth.context';

import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Signup({history}) {
  // destructuring our auth state object & action creator func from AuthContext
  // state is our current global auth state object in AuthContext
  const { state, signup } = useContext(AuthContext);
  // console.log(state)

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();

    // calling signup action creator
    signup({ username, email, password });

    // redirect user to home page
    history.push('/')

    // to clear form values
    setEmail('');
    setPassword('');
  };

  const handleSetEmail = e => {
    setEmail(e.target.value);
  };

  const handleSetPassword = e => {
    setPassword(e.target.value);
  };

  const handleSetUsername = e => {
    setUsername(e.target.value);
  };

  // loading object
  // if (isLoading) {
  //   return (
  //     <div className='alert alert-info' role='alert'>
  //       Data is being loaded!
  //     </div>
  //   );
  // }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-xs-12 col-sm-6 col-lg-4'>
          <Form onSubmit={handleFormSubmit}>
            <h1 className='text-xs-center'>Sign Up</h1>

            {state.errorMessage ? (
              <div className='alert alert-danger text-center' role='alert'>
                {state.errorMessage}
              </div>
            ) : null }

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='enter name'
                value={username}
                onChange={handleSetUsername}
              />
            </Form.Group>

            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='enter email'
                value={email}
                onChange={handleSetEmail}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='enter password'
                value={password}
                onChange={handleSetPassword}
              />

              <Form.Text>
                <Link to='/login'>Already have an account? Login here!</Link>
              </Form.Text>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
