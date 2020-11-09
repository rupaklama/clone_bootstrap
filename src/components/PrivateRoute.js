import React from 'react'
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ children, ...routeProps}) {
  // false to start with
  const profile = false;

  // if we don't have profile - false
  if (!profile) {
    return <Redirect to='/login' />
  }

  return (
    <Route {...routeProps}>
      { children }
    </Route>
  )
}

export default PrivateRoute
