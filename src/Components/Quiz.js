import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flags } from './flag-obj';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPause, faPlay, faStar, faStop } from '@fortawesome/free-solid-svg-icons';

const Quiz = () => {
  const [score, setScore] = useState(parseInt(sessionStorage.getItem('score')) || 0);
  const [currentFlag, setCurrentFlag] = useState({});
  const [timer, setTimer] = useState(15);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
  const [options, setOptions] = useState([]);
  const [gamePaused, setGamePaused] = useState(false);
  const timerIntervalRef = useRef(null);

  const handleTimeUp = useCallback(() => {
    alert("Time's up! Game over");
    
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerIntervalRef.current);
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [handleTimeUp]);

  const getRandomFlags = useCallback((flagList, correctFlag, numberOfOptions = 4) => {
    const shuffledFlags = [...flagList].sort(() => 0.5 - Math.random());
    let selectedFlags = shuffledFlags.slice(0, numberOfOptions);

    // Ensure the correct flag is included
    if (!selectedFlags.includes(correctFlag)) {
      const randomIndex = Math.floor(Math.random() * numberOfOptions);
      selectedFlags[randomIndex] = correctFlag;
    }

    return selectedFlags;
  }, []);

  const loadNextFlag = useCallback(() => {
    setCorrectAnswerSelected(false);
    const randomFlag = flags[Math.floor(Math.random() * flags.length)];
    setCurrentFlag(randomFlag);

    const randomOptions = getRandomFlags(flags, randomFlag);
    setOptions(randomOptions);

    setTimer(15);
    startTimer();
  }, [getRandomFlags, startTimer]);

  const resetGame = useCallback(() => {
    sessionStorage.removeItem('score');
    setScore(0);
    setCorrectAnswerSelected(false);
    setGamePaused(false);
    loadNextFlag(); // Start fresh game
  }, [loadNextFlag]);

//Attempting to call resetGame after Time's up!
//Implementation succesful rendering 05/12/2024
  useEffect(() =>{
    if(timer < 1){
      return resetGame();
    }
  }, [resetGame, timer]);

  useEffect(() => {
    if (!gamePaused) {
      loadNextFlag();
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [gamePaused, loadNextFlag]);

  const handleFlagClick = (countryName) => {
    if (correctAnswerSelected) {
      alert("This question has already been answered! Please click continue to load the next quiz.");
      return;
    }

    if (countryName === currentFlag.country) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        sessionStorage.setItem('score', newScore);
        return newScore;
      });
      clearInterval(timerIntervalRef.current);
      setCorrectAnswerSelected(true);
      alert("Correct! You selected the right flag.");
      setTimeout(loadNextFlag, 1000); // Automatically load next question after 1 second
    } else {
      alert("Incorrect. Please try again.");
      clearInterval(timerIntervalRef.current);
    }
  };

  const quitGame = () => {
    setGamePaused(true);
    clearInterval(timerIntervalRef.current);
    if (window.confirm("Are you sure you want to quit the game?")) {
      resetGame();
    } else {
      setGamePaused(false);
      startTimer();
    }
  };

  const pauseGame = () => {
    setGamePaused(true);
    clearInterval(timerIntervalRef.current);
  };

  const continueGame = () => {
    setGamePaused(false);
    startTimer();
  };

  return (
    <div className="container quiz-container">
      <div className="row align-items-start">
        <div className='col first-div'>
        </div>
      <div className='col'>
                <h1>Flag Quiz</h1>
            <p className='quiz-start'>Click the correct flag from the four flags provided that correspond to the the country name given below</p>
            <div className="score-timer">
                <button id='score' className='btn btn-secondary'><span><FontAwesomeIcon icon={faStar}/>: {score}</span></button>
                <button id='time' className='btn btn-secondary'><span><FontAwesomeIcon icon={faClock}/>: {timer}s</span></button>
            </div>
      <div className="quiz-content">
        <div className="country-name">
          <button id="correct_country_button" className="btn btn-success">
            {currentFlag.country}
          </button>
        </div>
        <div className="flag-choice">
          {options.map((flag, index) => (
            <div key={index} className="flag-item" onClick={() => handleFlagClick(flag.country)}>
              <img src={flag.image} alt={flag.country} />
            </div>
          ))}
        </div>
      </div>
      {!gamePaused && (
        <>
          <button className="btn btn-primary" onClick={loadNextFlag}><FontAwesomeIcon icon={faPlay}/>Play</button>
          <button className="btn btn-danger" onClick={quitGame}><FontAwesomeIcon icon={faStop}/>End</button>
          <button className="btn btn-warning" onClick={pauseGame}><FontAwesomeIcon icon={faPause}/>Pause</button>
        </>
      )}
      {gamePaused && (
        <button className="btn btn-success" onClick={continueGame}>Resume</button>
      )}
    </div>
    <div className='col last-div'>

    </div>
    </div>
    </div>
  );
};

export default Quiz;

