import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {

  const style = { color : 'green' }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light' >
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
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
