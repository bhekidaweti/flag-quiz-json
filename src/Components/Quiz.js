import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flags } from './flag-obj';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPause, faPlay, faStar, faStop } from '@fortawesome/free-solid-svg-icons';

const Quiz = ( { onNavigate } ) => {
  const [score, setScore] = useState(parseInt(sessionStorage.getItem('score')) || 0);
  const [currentFlag, setCurrentFlag] = useState({});
  const [timer, setTimer] = useState(15);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
  const [options, setOptions] = useState([]);
  const [gamePaused, setGamePaused] = useState(false);
  const timerIntervalRef = useRef(null);
  const [highScore, setHighScore] = useState(parseInt(sessionStorage.getItem('highScore')) || 0);


  const handleTimeUp = useCallback(() => {
    alert("Time's up! Game over 🤔");
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
    sessionStorage.setItem('highScore', Math.max(highScore, score));
    setHighScore((prevHighScore) => Math.max(prevHighScore, score));
    setScore(0);
    setCorrectAnswerSelected(false);
    setGamePaused(false);
    clearInterval(timerIntervalRef.current);
  }, [highScore, score]);

  const handleFlagClick = (countryName) => {
    if (correctAnswerSelected) {
      alert("This question has already been answered! Please click continue to load the next quiz.");
      return;
    }

    if (countryName === currentFlag.country) {
      setScore((prevScore) => prevScore + 1);
      clearInterval(timerIntervalRef.current);
      setCorrectAnswerSelected(true);
      alert("Correct! You selected the right flag. 🙂");
      setTimeout(loadNextFlag, 1000);
    } else {
      alert("Incorrect. Game over! 😮");
      resetGame();
    }
  };

  const quitGame = () => {
    setGamePaused(true);
    clearInterval(timerIntervalRef.current);
    if (window.confirm("Are you sure you want to quit the game? 🙄")) {
      sessionStorage.setItem('highScore', Math.max(highScore, score));
      onNavigate("/");
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
    loadNextFlag();
  };

  useEffect(() => {
    loadNextFlag();
    return () => clearInterval(timerIntervalRef.current);
  }, [loadNextFlag]);

  return (
    <div className="container quiz-container">
      <h1>Flag Quiz</h1>
      <p className="quiz-start">
        Click the correct flag from the four flags provided that correspond to the country name given below.
      </p>
      <div className="score-timer">
        <button id="score" className="btn btn-secondary">
          <FontAwesomeIcon icon={faStar} /> Score: {score}
        </button>
        <button id="high-score" className="btn btn-warning">
          High Score: {highScore}
        </button>
        <button id="time" className="btn btn-secondary">
          <FontAwesomeIcon icon={faClock} /> {timer}s
        </button>
      </div>
      {!gamePaused && (
        <>
          <button className="btn btn-primary" onClick={loadNextFlag}>
            <FontAwesomeIcon icon={faPlay} /> Play
          </button>
          <button className="btn btn-danger" onClick={quitGame}>
            <FontAwesomeIcon icon={faStop} /> Quit
          </button>
          <button className="btn btn-warning" onClick={pauseGame}>
            <FontAwesomeIcon icon={faPause} /> Pause
          </button>
        </>
      )}
      {gamePaused && (
        <div className="stop-game">
          <div className="alert alert-success">
            <strong>Game Paused!</strong> Click Play to continue.
          </div>
          <button className="btn btn-primary" onClick={continueGame}>
            <FontAwesomeIcon icon={faPlay} /> Play
          </button>
        </div>
      )}
      {!gamePaused && (
        <div className="quiz-content">
          <div className="country-name">
            <button className="btn btn-success">{currentFlag.country}</button>
          </div>
          <div className="flag-choice">
            {options.map((flag, index) => (
              <div key={index} className="flag-item" onClick={() => handleFlagClick(flag.country)}>
                <img src={flag.image} alt={flag.country} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
