import React from 'react'
import { useLocation } from 'react-router-dom'

const Error = () => {
  const location = useLocation();
  const { code } = location.state;

  function displayMessage() {
    let msg = "";
    if (code === 500) {
      msg = "Internal Server Error"
    }
    else if (code === 404) {
      msg = "Page Not Found"
    }
    else if (code === 401) {
      msg = "Unauthorized"
    }
    return <h1>{msg}</h1>
  }

  return (
    <div className='d-flex flex-column align-items-center'>
      {displayMessage()}
      <h1 id='status-code'>{code}</h1>
    </div>
  )
}

export default Error
