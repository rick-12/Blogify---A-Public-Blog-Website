import React, { useContext } from 'react'
import BlogContext from '../Context/BlogContext'

const Alert = () => {
  const blogContext = useContext(BlogContext);
  const { alert } = blogContext;

  return (
    <>
      {
        alert && <div className={`alert alert-${alert.type} alert-dismissible fade show  sticky-top`} role="alert">
          <strong>{alert.heading}!</strong> {alert.msg}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      }
    </>
  )
}

export default Alert
