import React from "react";
import { Chessboard } from "react-chessboard";
import classes from "./Chess.module.scss";

const Chess = () => {
  return (
    <div className={classes.chess}>
      <div className={classes.chessboard}>
        <Chessboard id="board" />
      </div>
    </div>
  );
};

export default Chess;
