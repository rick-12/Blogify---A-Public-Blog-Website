import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeContext from '../Context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const location = useLocation();
  const themeContext = useContext(ThemeContext);
  const { mode, toggleMode } = themeContext;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    navigate("/", {
      replace: true
    });
  }

  return (
    <>
      <div className="modal fade" data-bs-theme={mode} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Logout this site</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={logout} data-bs-dismiss="modal">Logout</button>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg" id='navbar'>
        <div className="container" id='nav-container'>
          <Link className="navbar-brand" to="/">DAILY JOURNAL</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">HOME</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/my-blogs" ? "active" : ""}`} aria-current="page" to={`${localStorage.getItem("isAuthenticated") ? "/my-blogs" : "/login"}`}>MY BLOGS</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">ABOUT US</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} aria-current="page" to="/contact">CONTACT US</Link>
              </li>
            </ul>
            {
              localStorage.getItem("isAuthenticated") ? <Link className="btn btn-secondary" to="/" role="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Logout</Link> :
                <div>
                  <Link className="btn btn-warning mx-3" to="/register" role="button">Sign up</Link>
                  <Link className="btn btn-info" to="/login" role="button">Login</Link>
                </div>
            }
          </div>
        </div>
        <span id='icon'><FontAwesomeIcon icon={mode === "dark" ? faSun : faMoon} onClick={toggleMode} cursor="pointer" size='lg' /></span>
      </nav>
    </>
  )
}

export default Navbar
