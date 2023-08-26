import React, { useEffect, useState } from 'react'
import ThemeContext from './ThemeContext';

const ThemeState = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("mode"));

  useEffect(() => {
    if (mode === "dark") {
      document.body.style.backgroundColor = "#03082e";
      document.body.style.color = "white";
      document.getElementById("icon").style.color = "white";
      document.getElementById("navbar").classList.add("navbar-dark", "bg-dark");
      document.getElementById("navbar").classList.remove("navbar-light", "bg-light");
    }
    else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "black";
      document.getElementById("icon").style.color = "black";
      document.getElementById("navbar").classList.add("navbar-light", "bg-light");
      document.getElementById("navbar").classList.remove("navbar-dark", "bg-dark");
    }
  }, [mode])


  const toggleMode = () => {
    if (mode === "light") {
      localStorage.setItem("mode", "dark");
      setMode("dark");
    }
    else {
      localStorage.setItem("mode", "light");
      setMode("light");
    }
  }

  return (
    <ThemeContext.Provider value={{mode, toggleMode}}>
      { children }
    </ThemeContext.Provider>
  )
}

export default ThemeState
