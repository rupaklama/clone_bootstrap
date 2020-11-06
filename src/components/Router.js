import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Article from '../pages/Article';
import GlobalFeed from '../pages/GlobalFeed';
import Login from '../pages/Login';

const Router = () => {
  // Slug is the unique identifying part of a web address, typically at the end of the URL
  return (
    <Switch>
      <Route exact path='/' component={GlobalFeed} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Login} />
      <Route path='/articles/:slug' component={Article} />
    </Switch>
  );
};

export default Router;
