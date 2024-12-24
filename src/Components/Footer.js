import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";





const Footer = () => {
    return (
      <footer className="app-header">
        <div className="footer">
          <ul className="nav justify-content-center">
            
            <li><a href="https://bheki.co.uk">< FontAwesomeIcon icon={faCode} /> Dev Portfolio</a></li>
          </ul>
          <hr></hr>
          
        </div>
      </footer>
    );
  }
  
  export default Footer;