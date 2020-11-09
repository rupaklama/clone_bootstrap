import React from 'react'
import { Route } from 'react-router-dom';

function PrivateRoute({ children, ...routeProps}) {
  

  return (
    <Route {...routeProps}>
      { children }
    </Route>
  )
}

export default PrivateRoute
