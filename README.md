# Flag Quiz React Project
This is the React version of the Flag Quiz game, 
where users test their knowledge of world flags by selecting the correct flag for a randomly provided country name.
 This version was developed as an alternative to the original Django-based project, 
 improving scalability, user experience, and deployment ease.

## Tech Stack
Frontend: React (Functional Components & Hooks)
State Management: useState, useEffect
Styling: CSS and Bootstrap
Deployment: Netlify, Render

## How to Play
-A random country name appears on the screen.
-The player must select the correct flag within a limited time (e.g., 15 seconds).
-A correct selection earns 1 point and loads the next round.
-An incorrect selection resets the game to zero.
-If time runs out before a selection, no points are awarded, and the round moves on.

## Features
-Interactive UI with real-time feedback
-Timer-based gameplay to add challenge
-Score tracking to keep users engaged
-Randomized flag selection for replayability
-Optimized for mobile & desktop for accessibility

## Setup & Installation
To run the project locally:

Clone the repository:
```
	git clone https://github.com/bhekidaweti/flag-quiz-react.git
```
```
	cd flag-quiz-react
```
Install dependencies:
```
	npm install
```
Start the development server:
```
	npm start
```
Open http://localhost:3000 in your browser.


## Challenges & Learnings
State Management: Managing the timer, score, and game logic efficiently using React’s state and effects.
Deployment: Unlike Django, deploying React was more straightforward as all files are static, making Netlify and Render a great option.


## Future Enhancements
Leaderboard System to track high scores
Difficulty Modes (Easy, Medium, Hard)
Animations & UI Enhancements for better engagement
Multiplayer Mode for competitive gameplay

