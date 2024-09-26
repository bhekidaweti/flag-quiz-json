import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, } from '@fortawesome/free-solid-svg-icons';

const Header  = () => {
    return (
      <header className="app-header">
        <nav >
          <ul className="nav justify-content-center">
            
            <li><Link to="/" className="btn btn-info"><FontAwesomeIcon icon={faHouse} /></Link></li>
            <Link to="flaglist" className="btn btn-info">Flag List</Link>
            <Link to="quiz" className="btn btn-info">Start the Quiz </Link>
          </ul>
          <hr></hr>
          
        </nav>
      </header>
    );
  }
  
  export default Header;