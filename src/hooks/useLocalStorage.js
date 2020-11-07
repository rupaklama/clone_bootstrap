import { useState } from "react"

// This hook is to store local storage's data in our app state to share

// localStorage.setItem('token', response.token)  
// this function takes two args - setItem's 'key & value' of our local storage
// initial value can be string by default & optional to not to put it if we don't want to
export default (key, initialValue = '') => { // key/value of setItem

  // our state will be synchronize with local storage
  const [value, setValue] = useState(() => { 
    // value can be set to useState(false) as a first arg
    // but we can also write function as a first arg here known as lazy initial state
    // normally, we use function here to calculate expensive calculation for our initial state
    // In our case, it's a good idea to set our default value/state from local storage with func here
    // which returns local storage with key from our arg & 
    // if it's undefined then it will be our initial default value
    return localStorage.getItem(key) || initialValue
  })

  // When we call setValue from outside, we are changing & updating state/value here
  const setStoredValue = value => {
    // value is response object like user token
    setValue(value)
    localStorage.setItem(key, value) 
  }

  // next step is this - to give outside components our value/state & to update it 
  return [value, setStoredValue]
}

// NOTE: This hook is to update our app state with local storage. 
// Now, we can use this to share our app local storage state
