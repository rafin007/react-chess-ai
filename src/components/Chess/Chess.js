import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import PlayerVsPlayer from "../PlayerVsPlayer/PlayerVsPlayer";
import PlayerVsRandom from "../PlayerVsRandom/PlayerVsRandom";
import classes from "../Chess.module.css";

const Chess = () => {
  const [boardSize, setBoardSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      const getBoard = document.querySelector(`.${classes.chessboard}`);
      setBoardSize(getBoard.offsetWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // window.removeEventListener("resize");
    };
  }, [boardSize]);

  return (
    <div className={classes.chess}>
      <div className={classes.chessboard}>
        {/* <Chessboard id="board" /> */}
        <PlayerVsRandom boardWidth={boardSize} />
        {/* <PlayerVsPlayer boardWidth={boardSize} /> */}
      </div>
    </div>
  );
};

export default Chess;
