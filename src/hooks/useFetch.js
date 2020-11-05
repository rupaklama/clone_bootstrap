import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook - Hook is just a function with args or without args
export default url => {
  const baseUrl = 'http://localhost:5000';

  // true - when starting fetching, false - when done fetching
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [options, setOptions] = useState({});

  // custom hook - doFetch function
  // options - params for axios call
  const doFetch = (options = {}) => {
    setOptions(options)
    // this triggers our effect
    setIsLoading(true)
  };

  // helper variable updater pattern
  const notLoading = isLoading === false;

  useEffect(() => {
    // if not loading, return null & exit
    // don't need to do anything in our effect
    // we are calling effect every time but
    // if loading is true, only then we will make request
    // if (!isLoading) {
    //   return null;
    // }

    // same as above but good approach since we are not changing it directly
    // may cause issues when state gets updated asynchronously
    if (notLoading) {
      return null;
    }

    axios(baseUrl + url, options)
      .then(res => {
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.response.data);
        setIsLoading(false);
      });
  }, [isLoading]); // gets trigger when loading prop is changing

  // array with two args - object's props states & function
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
