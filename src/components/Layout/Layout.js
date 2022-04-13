import React, { useState, useEffect, useContext } from "react";
import PlayerVsPlayer from "../PlayerVsPlayer/PlayerVsPlayer";
import PlayerVsAI from "../PlayerVsAI/PlayerVsAI";
import classes from "../Chess.module.css";
import Buttons from "../Buttons/Buttons";
import FullScreenDialog from "../Dialog/Dialog";
import { OpponentContext } from "../../Contexts/GameContext";

const Layout = () => {
  const [boardSize, setBoardSize] = useState(560);

  const { opponent, setOpponent } = useContext(OpponentContext);

  console.log(opponent);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const getBoard = document.querySelector(`.${classes.chessboard}`);
  //     setBoardSize(getBoard.offsetWidth);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();

  //   return () => {
  //     window.removeEventListener("resize");
  //   };
  // }, [boardSize]);
  let opponentComponent;

  // useEffect(() => {
  if (opponent === "AI")
    opponentComponent = <PlayerVsAI boardWidth={boardSize} />;
  else opponentComponent = <PlayerVsPlayer boardWidth={boardSize} />;
  // }, [opponent]);

  return (
    <div className={classes.chess}>
      <FullScreenDialog />
      <div className={classes.chessboard}>{opponentComponent}</div>
      <Buttons />
    </div>
  );
};

export default Layout;
