import { React, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import Routes and Route
import FlagList from './Components/FlagList';
import Home from './Components/Home';
import Quiz from './Components/Quiz';
import Footer from "./Components/Footer";
import './App.css';
import CountrySearch from "./Components/CountrySearch";
import WorldArticles from "./Components/WorldArticles";
import AdminPostForm from "./Components/AdminPostForm";
import Login from "./Components/Login";

const App = () => {
  const navigate = useNavigate(); // Ensure this is inside the Router context
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <header>
        <ul>
          <li style={{ float: "left", fontSize: "80px" }}>&#127988;</li>
          <li>
            <h1>Play the world flags quiz, expand your knowledge, have fun</h1>
          </li>
        </ul>
      </header>
      <nav className="nav nav-pills">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/flaglist")}>
          Flag List
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/quiz")}>
          Play Quiz
        </button>
      </nav>
      <div className="row align-item-start">
        <div className="col" style={{ backgroundColor: "bisque" }}>
          <CountrySearch />
        </div>

        <div className="col">
          {/* Define Routes */}
          <Routes>             
              <Route path="/" element={<Home />} />
              <Route path="/flaglist" element={<FlagList />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route
                path="/admin"
                element={
                  token ? <AdminPostForm token={token} /> : <Login setToken={setToken} />
                }
              />
              <Route path="login" element={<Login setToken={setToken} />} />
            </Routes>
        </div>

        <div className="col" style={{ backgroundColor: "bisque" }}>
          <WorldArticles />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
