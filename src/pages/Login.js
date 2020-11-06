import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';

function Login(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // to direct to login or register - using path prop of match object
  const isLogin = props.match.path === '/login';
  // console.log(props)

  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const navigateLink = isLogin ? '/register' : '/login';
  const navigationText = isLogin ? 'Create an account?' : 'Already have an account?';

  // api urls
  const apiUrl = isLogin ? '/login' : '/signup';

  // custom hook
  // state: state is object's state props
  // setState: setter function - doFetch custom function
  const [{ isLoading, error, response }, doFetch] = useFetch(apiUrl);
  // console.log('useFetch', isLoading, error, response)

  const handleFormSubmit = e => {
    e.preventDefault();

    // user detail for auth
    const user = isLogin ? {email, password} : {username, email, password};

    // using custom hook to make call to api
    // params for axios call
    doFetch({
      method: 'post',
      // user data for authentication
      data: user
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

  const handleSetUsername = e => {
    setUsername(e.target.value);
  }

  // loading object
  if (isLoading) {
    return <div>Data is being loaded!</div>;
  }

  // error object
  if (error) {
    return <div>Error occurred: {error}</div>;
  }


  return (
    <div className='container col-md-6'>
      <Form onSubmit={handleFormSubmit}>

        <h1 className="text-xs-center">{pageTitle}</h1>

        { !isLogin && <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter name'
            value={username}
            onChange={handleSetUsername}
          />
        </Form.Group>}

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
            <Link to={navigateLink}>{navigationText}</Link>
          </Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit' disabled={isLoading}>
          {pageTitle}
        </Button>
      </Form>
    </div>
  );
}

export default Login;
