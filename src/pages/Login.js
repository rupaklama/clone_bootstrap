import React, { useState, useContext, useEffect } from 'react';

// auth context object
import { Context as AuthContext } from '../context/auth.context';

import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Login({ history }) {
  // destructuring our auth state object & action creator func from AuthContext
  // state is our current global auth state object in AuthContext
  const { state, signin, tryLocalSignin } = useContext(AuthContext);
  // console.log(state);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // auto sign in user if user is logged in
    tryLocalSignin();
  }, [tryLocalSignin]);

  const handleFormSubmit = e => {
    e.preventDefault();

    // calling signup action creator
    signin({ email, password });

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
            <h1 className='text-xs-center'>Sign In</h1>

            {state.errorMessage ? (
              <div className='alert alert-danger text-center' role='alert'>
                {state.errorMessage}
              </div>
            ) : null}

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
                <Link to='/register'>Need an account? Create here!</Link>
              </Form.Text>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
