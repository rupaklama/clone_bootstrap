import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Form, Button } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // custom hook
  // state: state is object's state props
  // setState: setter function - doFetch custom function
  const [{ isLoading, error, response }, doFetch] = useFetch('/signin');
  console.log('useFetch', isLoading, error, response)

  const handleFormSubmit = e => {
    e.preventDefault();

    // using custom hook to make call to api
    // params for axios call
    doFetch({
      method: 'post',
      data: {
        email: 'indira@test.com',
        password: '123',
      },
    })

    // making api request here when true
    // setIsSubmitting(true);
    // console.log(email, password);

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

  return (
    <div className='container'>
      <Form onSubmit={handleFormSubmit}>
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
            <Link to='/register'>Need an account?</Link>
          </Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit' disabled={isLoading}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
