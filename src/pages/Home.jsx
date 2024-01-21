// Home.js

import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import CustomChessboard from "../components/CustomChessboard";
import { detectDevice } from "../utils/DetectDevice";
import "../assets/css/Home.css";

function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      )
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [isMobile]);

  useEffect(() => {
    let intervalId;

    if (gameStarted) {
      // Start the timer interval
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
      }, 10); // Increment every 100 milliseconds
    }

    // Cleanup interval when component unmounts or game ends
    return () => clearInterval(intervalId);
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
  };

  // Function to format the timer in MM:SS.SS
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.floor((timer % 60000) / 1000);
    const milliseconds = Math.round(timer % 1000); // Round milliseconds to two decimal places
    const formattedMilliseconds = Math.floor(milliseconds / 10); // Extract the first two digits

    // Ensure a fixed width for each component
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMs = String(formattedMilliseconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}.${formattedMs}`;
  };

  return (
    <div className="z-0">
      {!gameStarted ? (
        <h1 className="font-extrabold text-transparent text-center text-2xl bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          Memorize and fill in the chessboard!
        </h1>
      ) : (
        <h1 className="font-extrabold text-center text-2xl timer-display">
          Timer: {formatTimer()}
        </h1>
      )}

      {/* Container for the button and chessboard */}
      <div className="chessboard-container">
        {!gameStarted && (
          <button onClick={startGame} className="start-game-button">
            Start Game
          </button>
        )}
        {gameStarted && <CustomChessboard />}
      </div>

      <div className="text-center">
        <br />
        {isMobile ? (
          <>
            <h1>Mobile shortcuts:</h1>
            <h1>Double tap to change color</h1>
            <h1>Swipe left to move to left piece</h1>
            <h1>Swipe right to move to right piece</h1>
          </>
        ) : (
          <>
            <h1>Keyboard shortcuts:</h1>
            <h1>Press S to change color</h1>
            <h1>Press A to move to left piece</h1>
            <h1>Press D to move to right piece</h1>
          </>
        )}
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
        <h1>bro</h1>
      </div>
    </div>
  );
}

export default Home;
