import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import PlayerVsPlayer from "../PlayerVsPlayer/PlayerVsPlayer";
import PlayerVsAI from "../PlayerVsAI/PlayerVsAI";
import classes from "../Chess.module.css";

const Chess = () => {
  const [boardSize, setBoardSize] = useState(560);

  useEffect(() => {
    const handleResize = () => {
      const getBoard = document.querySelector(`.${classes.chessboard}`);
      setBoardSize(getBoard.offsetWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      // window.removeEventListener("resize");
    };
  }, [boardSize]);

  return (
    <div className={classes.chess}>
      <div className={classes.chessboard}>
        {/* <Chessboard id="board" /> */}
        <PlayerVsAI boardWidth={boardSize} />
        {/* <PlayerVsPlayer boardWidth={boardSize} /> */}
      </div>
    </div>
  );
};

export default Chess;
