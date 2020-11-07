import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from '../context/auth.context';

function Login(props) {
  // console.log(props)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // to set user token in local storage
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  // to direct to login or register page
  // using path prop of match object of route props
  const isLogin = props.match.path === '/login';
  // console.log(isLogin)
  // if we are in login page, returns true
  // if we are not in login page, returns false

  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const navigationLink = isLogin ? '/register' : '/login';
  const navigationText = isLogin
    ? 'Need an account? Click here to create one!'
    : 'Already have an account? Login here!';

  // api urls
  const apiUrl = isLogin ? '/login' : '/signup';

  // custom hook
  // state: state is object's state props
  // setState: setter function - doFetch custom function
  const [{ isLoading, error, response }, doFetch] = useFetch(apiUrl);
  console.log('useFetch', isLoading, error, response);

  // useLocalStorage hook takes the token key &
  // stores the value in the local storage & updates our state
  // token is key & value is user token
  const [, setToken] = useLocalStorage('token'); // key
  // console.log('token', token)

  // auth context object
  const [, setCurrentUserState] = useAuth();

  // saving a user token is side effect
  // basically, we want to call this useEffect only
  // when we get response object & updates to it
  useEffect(() => {
    // if no response object, exit
    if (!response) {
      return;
    }

    // if response object, run this code
    // storing user token in useLocalStorage hook & to update app state
    setToken(response.token);
    // localStorage.setItem('token', response.token); // key/value

    // user sign up got successful &  setting user token in local storage
    // this value will help us to redirect user after sign up
    setIsSuccessfulSubmit(true);

    // updating auth state inside context object
    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: true, // user is logged in now
      isLoading: false, // done loading user data
      currentUser: response.token, // updating response object in auth state
    }));
  }, [response, setCurrentUserState, setToken]);

  // using Redirect component of react router to redirect user after sign up
  if (isSuccessfulSubmit) {
    return <Redirect to='/' />;
  }

  const handleFormSubmit = e => {
    e.preventDefault();

    // user detail for auth
    const user = isLogin ? { email, password } : { username, email, password };

    // using custom hook to make call to api
    // params for axios call
    doFetch({
      method: 'post',
      // user data for authentication
      data: user,
    });
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
  };

  // loading object
  if (isLoading) {
    return (
      <div className='alert alert-info' role='alert'>
        Data is being loaded!
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-xs-12 col-sm-6 col-lg-4'>
          <Form onSubmit={handleFormSubmit}>
            <h1 className='text-xs-center'>{pageTitle}</h1>

            {error && (
              <div className='alert alert-danger text-center' role='alert'>
                Error occurred: {error}
              </div>
            )}

            {/** if we are not in login page - false value, render this input */}
            {!isLogin && (
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='enter name'
                  value={username}
                  onChange={handleSetUsername}
                />
              </Form.Group>
            )}

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
                <Link to={navigationLink}>{navigationText}</Link>
              </Form.Text>
            </Form.Group>

            <Button variant='primary' type='submit' disabled={isLoading}>
              {pageTitle}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
