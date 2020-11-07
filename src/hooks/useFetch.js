import { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

// Custom hook - Hook is just a function with args or without args
// This useFetch hook takes an argument - url arg, to fetch data
export default (url) => { // url param
  // base url
  const baseUrl = 'http://localhost:5000';

  // true - when starting fetching, false - when done fetching
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // to store request params in state
  const [options, setOptions] = useState({});

  // getting user token from local storage to add in header of options
  const [token] = useLocalStorage('token')
  // console.log(token)

  // custom hook - doFetch function to make call to api
  // options - request params object for axios call
  const doFetch = (options = {}) => {
    setOptions(options)
    // this triggers our effect to make request
    setIsLoading(true)
  };

  // helper variable updater pattern
  // const notLoading = isLoading === false;

  useEffect(() => {
    // when our component rendered first time
    let isMounted = true;

    // we are inside of useEffect so, 
    // same initial value of isLoading in our state - false
    // if not loading or loading is false, exit or stop execution useEffect func
    if (!isLoading) { // starting with false value
      return 
    }
   
    // new ajax request with header for auth
    const requestOptions = {
      ...options, // param object - method(get,post) / body(user data)
      ...{
        headers: { // adding user token for auth
          authorization: token ? `Token ${token}` : ''
        }
      }
    }

    // Returning null is usually the best idea if you intend to indicate that no data is available.
    // Blank return" statements can be used to stop executing a function for some reason - ex: validations etc).

    // NOTE: if isLoading is not false or loading is true, we want to run useEffect to make api request

    // baseurl + end url param + request methods with header
    axios(baseUrl + url, requestOptions)
      .then(res => {
        if (isMounted) {
          setResponse(res.data); // axios
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error.message);
          setIsLoading(false);
        }
      });

    // clean up method to prevent Memory leak
    // Memory leak occurs when changing the state of an unmounted component
    return () => {
      isMounted = false
    }
    
     // gets triggered/rendered only when loading prop's value changes
  }, [isLoading, options, response, url]);

  // array with two args - Object with props states & function
  // destructuring to use above response data properties
  return [{ isLoading, response, error }, doFetch];
};

// Response object 'data' - is an object with three properties
// {
//   isLoading: true/false - which will show us if we are in the process of loading api call,
//   response: null to start & {} or [] - data from backend
//   error: null to start & {} - error object from backend
// }

// custom hook - doFetch
// const [data, doFetch] = useFetch('http://localhost:5000/signin');

// destructuring to use above response data properties
// const [{ isLoading, response, error }, doFetch] = useFetch('http://localhost:5000/signin');
// now, we can use this custom hook in all our components with its response data properties
