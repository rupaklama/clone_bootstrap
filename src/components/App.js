import React from 'react';
import { AuthProvider } from '../context/auth.context';

import Header from './Header';
import Router from './Router';

function App() {
  return (
    <div className='container'>
      <AuthProvider>
        <Header />
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
