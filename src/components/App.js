import React from 'react';
import { CurrentUserProvider } from '../context/auth.context';
import CurrentUserChecker from './auth/CurrentUserChecker';

import Header from './Header';
import Router from './Router';

function App() {
  return (
    <div className='container'>
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Header />
          <Router />
        </CurrentUserChecker>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
