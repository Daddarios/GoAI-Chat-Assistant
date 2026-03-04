import "./Header.css";
import {  BsSun, BsMoon } from "react-icons/bs";


export default function Header({ dark, toggleTheme }) {
  return (
    <div className="header-container">
      <button
        onClick={toggleTheme}
        className="darklight"
        type="button"
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {dark ? <BsSun /> : <BsMoon />}
      </button>
      
      <h2 className="header-title">
        Go -  ÆI
      </h2>
      
       {/* 
       ANIMASYONLU YAZI ALANI */}
    </div>
    
  )
}