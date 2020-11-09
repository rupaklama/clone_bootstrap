import React, { useContext } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { Context as AuthContext } from '../context/auth.context';

const style = { color: 'green' };

const Header = ({ history }) => {

  const { signout } = useContext(AuthContext);

  const handleSignOut = () => {
    // console.log('sign out')
    signout()

    // redirect user to login page
    history.push('/login')
    
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div className='container'>
          <Link to='/' className='navbar-brand h1' style={style}>
            Connect Bazzar
          </Link>
          <ul className='nav navbar-nav float-sm-right'>
            <li className='nav-item'>
              <NavLink to='/' className='nav-link' exact>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/login' className='nav-link'>
                Sign in
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/register' className='nav-link'>
                Sign up
              </NavLink>
            </li>
            <li className='nav-item'>
              <Button variant="outline-danger" onClick={handleSignOut}>Sign out</Button>{' '}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Header);
