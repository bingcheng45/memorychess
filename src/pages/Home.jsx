// Home.js

import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import CustomChessboard from "../components/CustomChessboard";
import { detectDevice } from "../utils/DetectDevice";

function Home() {
  const [isMobile, setIsMobile] = useState(false);
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
  return (
    <div className="z-0">
      <h1 className="font-extrabold text-transparent text-center text-2xl bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        Memorize and fill in the chessboard!
      </h1>
      {/* <div style={{ width: "70%", margin: "0 auto" }}>
        <Chessboard position={{}} width={600} />
      </div> */}
      <CustomChessboard />

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
