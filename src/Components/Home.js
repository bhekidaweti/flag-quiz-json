import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="home-container">
            <h1>Flag List</h1>
            <Link to="flaglist" className="button">Flag List</Link>
            <p><Link to="quiz" id="start-button">Start the Quiz </Link></p>
        </div>
    )
}

export default Home;