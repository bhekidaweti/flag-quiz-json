import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";

const Header  = () => {
    return (
      <header className="app-header">
        <nav >
          <ul className="nav justify-content-center">
            <li style={{fontSize: "30px", paddingRight: "10px"}}> &#127988; </li>
            <li><Link to="/" className="btn btn-info"><FontAwesomeIcon icon={faHouse} />Home</Link></li>
            <li><Link to="flaglist" className="btn btn-info"> <FontAwesomeIcon icon={faList} />Flag List</Link></li>
            <li><Link to="quiz" className="btn btn-info"><FontAwesomeIcon icon={faPlay} />Play Quiz</Link></li>
          </ul>
          <hr></hr>    
        </nav>
      </header>     
    );
  }
  
  export default Header;