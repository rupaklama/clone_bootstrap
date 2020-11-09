

// import context object
import createDataContext from './createDataContext';

// import axios instance
import authApi from '../api/auth.api';


// our auth reducer function
const authReducer = (state, action) => {
  // action is object, type is operation with that object
  // RULES for updating our state object inside reducer is that
  // we always have to return a brand new object so that we will never modify
  // our state object directly.
  switch (action.type) {
    case 'add_error':
      // update our state with added new property & value - errorMessage
      return { ...state, errorMessage: action.payload };
    case 'signup':
      // update our state with added new property & value - token
      // After user signs up, we don't want to have any error message anymore
      // because if user logs out & went back to sign up form, they would still see an error message
      // so, when user signs up, we want to reset entire state object, say ok we signed up
      // here's the token & we should no longer have error message, don't have to persist
      // any values from the current state object, we want to rebuild object from scratch
      // so when user signs up, empty out our error message state, not adding current state ...state
      return { errorMessage: '', token: action.payload }; // entire new state object
    case 'signin':
      // returning same state as above
      return { errorMessage: '', token: action.payload }; // entire new state object
    case 'clear_errorMessage':
      // clearing out error message by re-setting it into empty string
      return { ...state, errorMessage: '' };
    case 'signout':
      // to remove user token
      return { token: null, errorMessage: '' 
    }
    default:
      return state;
  }
};

// Action creators to modify our global State Object
// NOTE: accessing dispatch in createDataContext to update our state object

// Action Creator function returns JS objects
// Type is required, payload property is optional
// this action creator func gets call inside of our component - Login

// signup action creator
const signup = dispatch => {
  // this action func going to receive an object - user data

  

  return async ({ username, email, password }) => {
    // api request to sign up to backend server
    // if we sign up, modify our state to change to authenticated
    // if signing up fails, show error message

    // making api request here
    try {
      const response = await authApi.post('/signup', {
        username,
        email,
        password,
      });
      // console.log(response.data);
     

      // anytime user restarts our app or refresh the browser,
      // our app state (context & component's state) completely gets wiped away - removed
      // we will use browser's localStorage to persist our app state
      // storing token in localStorage
      await localStorage.setItem('token', response.data.token); // key/value

      // once we get & set user token in local storage
      // we will dispatch an action that will update user token state in context object
      dispatch({ type: 'signup', payload: response.data.token });

      // after successful storing of user token, we will redirect to other page
      // with history prop in Signup component
      
     

    } catch (error) {
      // console.log(err.message)
      // console.log(error.response.data);
      // if we have an error, dispatch a new action
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up',
        // payload: error.response.data
      });
    }
  };
};

// sign in action creator
// cleaning up function by removing return {} for concise code
const signin = dispatch => async ({ email, password }) => {
  // try to signIn
  // handle success by updating state
  // handle failure by showing error message
  try {
    const response = await authApi.post('/login', {
      email,
      password,
    });

    // storing token in localStorage
    await localStorage.setItem('token', response.data.token);

    // once we get & set user token in local storage
    // we will dispatch an action that will update user token state in context object
    dispatch({ type: 'signin', payload: response.data.token });

    // after successful login in, we will redirect user to other page
    // with history prop in Signup component
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};

// check to see if there's token in browser's local storage for auto sign
const tryLocalSignin = dispatch => async () => {
  const token = await localStorage.getItem('token');
  if (token) {
    // reusing action type - signin for login with token in local storage
    // if there's a token, lets dispatch an action immediately
    dispatch({ type: 'signin', payload: token });
  }
};

// to clear out Error messages after signup & login
const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_errorMessage' });
};


// sign out action creator to remove token from local storage
// & also from our global auth context state as well
const signout = dispatch => async () => {
  await localStorage.removeItem('token')
  dispatch({ type: 'signout' })
};

// we will take our reducer - authReducer & createDataContext
// and export provider & context to use through out our application
// this will give us back Context & Provider from createDataContext
// which will make all our data available to children components inside our application
export const { Context, Provider } = createDataContext(
  // passing three different arguments
  authReducer, // our reducer
  {
    // action objects to be dispatch & available state to all our components
    signin,
    signout,
    signup,
    clearErrorMessage,
    tryLocalSignin,
  },
  // our initial & current auth state which will be share everywhere
  // here we will dispatch an action to put the token & error message
  // in our global Context state object

  // { isSignedIn: false } to start with for demo
  // token is null by default since user is not logged in
  // errorMessage is empty string
  { token: null, errorMessage: '' }
);
