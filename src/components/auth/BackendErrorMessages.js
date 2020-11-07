import React from 'react'

// error object we get from backend as a param
const BackendErrorMessages = ({backendErrors}) => {
  // error object's prop keys
  const errorMessages = Object.keys(backendErrors).map(name => {
    const messages = backendErrors[name].join(' ')
    return `${name} ${messages}`
  })
  return (
    <ul className="error-messages">
      {errorMessages.map(errorMessage => {
        return <li key={errorMessage}>{errorMessage}</li>
      })}
    </ul>
  )
}

export default BackendErrorMessages

