// helper function to automate the process of creating context object for multiple data
// to avoid creating multiple context objects for different types of data,
// also to avoid creating multiple reducers to manage our states
// this will help us mainly with code duplications

// Context Object is a js object which gets store in a component's memory
// Here, we will create our Context object to store User data & make
// it available to other files in order to consume it.

import React, { useReducer } from 'react';

// automating context creation

// passing three things (params) that actually need to be customized,
// reducer - access to reducer functions from here in our context object
// actions is an objects that has all different callback functions to
// dispatch an action & update our state,
// our initial state object
export default (reducer, actions, initialState) => {

  // creating two things (context object & provider func) & return it
  // our Context object
  const Context = React.createContext();

  // helper Provider component
  // This provider component will wrap all our other components to get access to 
  // our global Context state, takes children component as a param
  const Provider = ({ children }) => {
    // reducer to update our global Context state object
    // The basic set up of the useReducer hook is the following:
    const [state, dispatch] = useReducer(reducer, initialState);

    // looping through all of our action objects provided by dispatch method
    // added little bit of fancy code here to allow helper functions in
    // other components to access dispatch to update our Global State object

    // boundActions is a process calling all our incoming Action Creators
    // with dispatch to update our Global State object
    const boundActions = {};
    for (let key in actions) {
      // example
      // boundActions[key] is an Action Creator 
      // actions[key] === reference to { return () => {} } - action object
    
      boundActions[key] = actions[key](dispatch); 
      // dispatch is incoming Action Creators to update our Global State object
    }

    // { state, ...boundActions } is our state object & action objects by dispatch
    // Provider component makes our data available to all the children components
    return (
      // ...boundActions are Action creators to update our state
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  // returning our Context object & Provider component
  return { Context, Provider };
};

// so we are going to loop through action object,
// take object key which is a function & call it with dispatch that's going to
// give us back - return function { return () => {} } to do something
// pass & store any values from the return function - { return () => {} }
// into our boundActions object &
// Finally, pass boundActions object to our provider value prop
// which will let all our children components to make changes to
// related context's state

// created reusable function to automate
// creating context object & provider component as many times as we want
// without code duplication

// createContext returns an object with 2 values: special components
// { Provider, Consumer }
// Provider component wraps around children components that can have an access to the Context Object

// using Provider component of Context object to make a value available to all
// children and grandchildren by using value={} property

