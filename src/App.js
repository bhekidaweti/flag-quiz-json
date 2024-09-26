import React from 'react';
import FlagList from './Components/FlagList';
import Home from './Components/Home';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './Components/Quiz';
import Header from './Components/Header';
import Footer from './Components/Footer';




const App = () => {

  return (
 <Router>
  <Header />
  <Routes>
    <Route path='/' element={< Home />} />
    <Route path='flaglist' element={<FlagList />} />
    <Route path='quiz' element={<Quiz />} />
  </Routes>
  <Footer />
 </Router>
 
  )
}
export default App;
