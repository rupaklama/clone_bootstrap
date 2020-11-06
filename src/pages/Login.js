import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from '../context/auth.context';

function Login(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // to set user token in local storage
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  // to direct to login or register - using path prop of match object
  const isLogin = props.match.path === '/login';
  // console.log(isLogin) returns true

  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const navigationLink = isLogin ? '/register' : '/login';
  const navigationText = isLogin
    ? 'Create an account?'
    : 'Already have an account?';

  // api urls
  const apiUrl = isLogin ? '/login' : '/signup';

  // custom hook
  // state: state is object's state props
  // setState: setter function - doFetch custom function
  const [{ isLoading, error, response }, doFetch] = useFetch(apiUrl);
  // console.log('useFetch', isLoading, error, response)

  // useLocalStorage hook takes the token key &
  // stores the value in the local storage & updates our state
  const [setToken] = useLocalStorage('token'); // key - token
  // console.log('token', token)

  // auth context object
  const [ currentUserState, setCurrentUserState] = useAuth();
  console.log('currentUserState', currentUserState)

  // saving a user token is side effect
  // basically, we want to call this useEffect only
  // when we get response object & updates to it
  useEffect(() => {
    let isMounted = true;

    // no response object
    if (!response) {
      return null;
    }

    if (isMounted) {
      // storing user token in localStorage for auth
      setToken(response.token);
      // localStorage.setItem('token', response.token) // key/value

      // setting user token in local storage
      setIsSuccessfulSubmit(true);
    }

    // clean up
    return () => {
      isMounted = false
    }
  }, [response, setToken]);

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

  // error object
  if (error) {
    return (
      <div className='alert alert-danger' role='alert'>
        Error occurred: {error}
      </div>
    );
  }

  // redirecting user after storing token
  if (isSuccessfulSubmit) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-xs-12 col-sm-6 col-lg-3'>
          <Form onSubmit={handleFormSubmit}>
            <h1 className='text-xs-center'>{pageTitle}</h1>

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
