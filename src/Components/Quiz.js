import React, { useState, useEffect, useRef } from 'react';
import { flags } from './flag-obj';
import 'bootstrap/dist/css/bootstrap.min.css';



const Quiz = () => {
  const [score, setScore] = useState(parseInt(sessionStorage.getItem('score')) || 0);
  const [currentFlag, setCurrentFlag] = useState({});
  const [timer, setTimer] = useState(15);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
  const [options, setOptions] = useState([]);
  const [gamePaused, setGamePaused] = useState(false);
  const timerIntervalRef = useRef(null); // Ref to store interval ID

  useEffect(() => {
    if (!gamePaused) {
      loadNextFlag();
    }
    return () => clearInterval(timerIntervalRef.current); // Clear timer on component unmount
  }, [gamePaused]);

  const startTimer = () => {
    clearInterval(timerIntervalRef.current); // Clear any previous timer
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
  };

  const handleTimeUp = () => {
    alert("Time's up! Game over");
    resetGame();
  };

  const getRandomFlags = (flagList, correctFlag, numberOfOptions = 4) => {
    const shuffledFlags = [...flagList].sort(() => 0.5 - Math.random());
    let selectedFlags = shuffledFlags.slice(0, numberOfOptions);

    // Ensure the correct flag is included
    if (!selectedFlags.includes(correctFlag)) {
      const randomIndex = Math.floor(Math.random() * numberOfOptions);
      selectedFlags[randomIndex] = correctFlag;
    }

    return selectedFlags;
  };

  const loadNextFlag = () => {
    setCorrectAnswerSelected(false);
    const randomFlag = flags[Math.floor(Math.random() * flags.length)];
    setCurrentFlag(randomFlag);

    // Get 4 random flags, including the correct one
    const randomOptions = getRandomFlags(flags, randomFlag);
    setOptions(randomOptions);

    setTimer(15); // Reset the timer to 15 seconds
    startTimer(); // Start the timer
  };

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
      clearInterval(timerIntervalRef.current); // Stop the timer
      setCorrectAnswerSelected(true);
      alert("Correct! You selected the right flag.");
      setTimeout(loadNextFlag, 1000); // Automatically load next question after 1 second
    } else {
      alert("Incorrect. Please try again.");
      clearInterval(timerIntervalRef.current); // Stop the timer
    }
  };

  const resetGame = () => {
    sessionStorage.removeItem('score');
    setScore(0);
    setCorrectAnswerSelected(false);
    setGamePaused(false);
    loadNextFlag(); // Start fresh game
  };

  const quitGame = () => {
    setGamePaused(true); // Pauses the game
    clearInterval(timerIntervalRef.current); // Clear the timer
    if (window.confirm("Are you sure you want to quit the game?")) {
      resetGame();
    } else {
      setGamePaused(false); // Resume the game if user cancels
      startTimer(); // Resume the timer
    }
  };

  const pauseGame = () => {
    setGamePaused(true); // Pauses the game
    clearInterval(timerIntervalRef.current); // Stop the timer
  };

  const continueGame = () => {
    setGamePaused(false); // Resumes the game
    startTimer(); // Resume the timer
  };

  return (
    <div className="quiz-container">
      <h1>Flag Quiz</h1>
      <div className="score-timer">
        <button id='score' className='btn btn-secondary'><span>Score: {score}</span></button>
        <button id='time' className='btn btn-secondary'><span>Time left: {timer}s</span></button>
      </div>
      <div className="quiz-content">
        <div className="country-name">
          <button id="correct_country_button" className="btn btn-success">
            {currentFlag.country}
          </button>
        </div>
        <div className="flag-list">
          {options.map((flag, index) => (
            <div key={index} className="flag-item" onClick={() => handleFlagClick(flag.country)}>
              <img src={flag.image} alt={flag.country} />
            </div>
          ))}
        </div>
      </div>
      {!gamePaused && (
        <>
          <button className="btn btn-primary" onClick={loadNextFlag}>Continue</button>
          <button className="btn btn-danger" onClick={quitGame}>Quit</button>
          <button className="btn btn-warning" onClick={pauseGame}>Pause</button>
        </>
      )}
      {gamePaused && (
        <button className="btn btn-success" onClick={continueGame}>Resume</button>
      )}
      <button className="btn btn-primary" onClick={resetGame}>Restart</button>
    </div>
  );
};

export default Quiz;
