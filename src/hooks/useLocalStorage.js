import { useEffect, useState } from "react"

// localStorage.setItem('token', response.token)  
// this function takes setItem's key as an argument &
// store keys value in the state - value
export default (key, initialValue = '') => { // key/value of setItem
  const [value, setValue] = useState(() => { 
    // value can be set to useState(false) but function is better approach
    // by default, if we have token then it's going to be our token in local storage or
    // empty string - initial value 
    return localStorage.getItem(key) || initialValue
  })

  // to update local storage
  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key]); // value is response object

  // returning value from our state
  return [value, setValue]
}

// NOTE: This hook is to set user token in local storage & update our state. 
