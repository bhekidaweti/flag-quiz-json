import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import BrowserRouter
import FlagList from './Components/FlagList';
import Home from './Components/Home';
import Quiz from './Components/Quiz';
import Footer from "./Components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import logo from './logo.png';
// import CountrySearch from "./parseWikiData"; //Implementation for Online scraping
import CountrySearch from "./Components/CountrySearch"; //Implementation for Offline scraping
import WorldArticles from "./Components/WorldArticles";

const App = () => {
  const [currentSection, setCurrentSection] = useState("/");
  const navigate = useNavigate(); // Ensure this is called inside the Router context

  const handleNavigation = (section) => {
    setCurrentSection(section);
    navigate(section); // Use navigate to update the URL
  };

  const renderSection = () => {
    switch (currentSection) {
      case "/":
        return <Home onNavigate={handleNavigation} />;
      case "quiz":
        return <Quiz onNavigate={handleNavigation} />;
      case "flaglist":
        return <FlagList onNavigate={handleNavigation} />;
      default:
        return <Home onNavigate={handleNavigation} />;
    }
  };

  return (
      <div className="App">
        <header>
          <ul>
            {/* <li><img src={logo} className="logo" alt="logo" style={{maxHeight: "100px", float: "left"}}/></li> */}
            <li style={{ float: "left", fontSize: "80px" }}>&#127988;</li>
            <li>
              <h1>Play the world flags quiz, expand your knowledge, have fun</h1>
            </li>
          </ul>
        </header>
        <nav className="nav nav-pills">
          <button
            className="btn btn-secondary"
            onClick={() => handleNavigation("/")}
          >
            Home
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleNavigation("flaglist")}
          >
            Flag List
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleNavigation("quiz")}
          >
            Play Quiz
          </button>
        </nav>
        <div className="row align-item-start">
          <div className="col" style={{ backgroundColor: "bisque" }}>
            {/* Return country data scraped from Wikipedia when user searches on the search box. */}
            {/* By default we'll return this data randomly or alphabetically on the first page render. */}
            <CountrySearch />
          </div>

          <div className="col">{renderSection()}</div>

          <div className="col" style={{ backgroundColor: "bisque" }}>
            {/** Blog content related to world data */}
            <WorldArticles />
          </div>
        </div>
        <Footer></Footer>
      </div>
  );
};

export default App;

