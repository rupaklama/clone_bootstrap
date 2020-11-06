import React, { createContext, useContext, useState } from 'react';

// Context Object is a js object which gets store in a component's memory
// Here, we will create our Context object to store User data & make
// it available to other files in order to consume it.
const AuthContext = createContext([{}, () => {}]); // value & setter 
// createContext takes array of two elements
// first element is an empty object
// Second element is callback function
// [{}, () => {}] is value & setter func like in useState hook - [state, setState]
// which is our initial data

// It returns an object with 2 values: special components
// { Provider, Consumer }
// Provider component wraps around a tree of components that can have an access to the Context Object
// using Provider component of Context object to make a value available to all
// children and grandchildren by using value={} property
export const AuthProvider = ({ children }) => {
  // our state object
  const [state, setState] = useState({
    isLoading: false, // data loading or not
    isLoggedIn: null, // user logged in or not
    currentUser: null // user response object - data like token 
  });

  return (
    // passing our initial data to children components
    // we can change the state object with setState method
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  )
}

// To consume Context object, we need to use useContext hook
// we have to import AuthContext object on every files to consume it,
// it gets tedious doing so, creating custom wrapper hook to make it more accessible
export const useAuth = () => useContext(AuthContext);
// useAuth is a function that returns whatever useContext going to return - our global state object
// function returning function
