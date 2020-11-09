import React from 'react';

// will have more than one context importing here
// renaming to organize better
import { Provider as AuthProvider } from '../context/auth.context'; 

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
