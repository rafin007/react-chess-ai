import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import PlayVsRandom from "../PlayerVsRandom/PlayerVsRandom";
import classes from "./Chess.module.scss";

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
        <PlayVsRandom boardWidth={boardSize} />
      </div>
    </div>
  );
};

export default Chess;
