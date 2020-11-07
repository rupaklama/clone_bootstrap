// After page reload, all current user data will disappear since
// we are storing in Context object which gets store in memory of browser
// that's why we need to fetch user each time on every page reload to get data of current user
// So, we want to fetch user data only once every time when our application is mounted
import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

// no mark up here, we only want to implement js logic here
function CurrentUserChecker({ children }) {

  // fetching user response data
  const [{ response }, doFetch] = useFetch()
  console.log('response', response)

  useEffect(() => {
    doFetch()
    
  }, [])

  return children;
}

export default CurrentUserChecker;
// to fetch user on rendering of this component
