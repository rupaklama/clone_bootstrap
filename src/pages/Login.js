import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <div className='container'>
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />

          <Form.Text>
            <Link to='/register'>Need an account?</Link>
          </Form.Text>

        </Form.Group>
        
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
