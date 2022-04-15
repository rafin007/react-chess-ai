import React, { useState, useEffect, useContext } from "react";
import PlayerVsPlayer from "../PlayerVsPlayer/PlayerVsPlayer";
import PlayerVsAI from "../PlayerVsAI/PlayerVsAI";
import classes from "../Chess.module.css";
import Buttons from "../Buttons/Buttons";
import FullScreenDialog from "../Dialog/Dialog";
import { OpponentContext } from "../../Contexts/GameContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import ResultModal from "../ResultModal/ResultModal";

const Layout = () => {
  const largeBoard = useMediaQuery("(min-width:575px)");
  const mediumBoard = useMediaQuery("(max-width:575px)");
  const smallBoard = useMediaQuery("(max-width:475px)");

  const [boardSize, setBoardSize] = useState(560);

  const { opponent, setOpponent } = useContext(OpponentContext);

  useEffect(() => {
    if (largeBoard) {
      setBoardSize(560);
    }
    if (mediumBoard) {
      setBoardSize(450);
    }
    if (smallBoard) {
      setBoardSize(350);
    }
  }, [smallBoard, mediumBoard, largeBoard]);

  let opponentComponent = null;

  if (opponent === "Human") {
    opponentComponent = (
      <div className={classes.chessboard}>
        <PlayerVsPlayer boardWidth={boardSize} />
      </div>
    );
  } else {
    opponentComponent = (
      <div className={classes.chessboard}>
        <PlayerVsAI boardWidth={boardSize} />
      </div>
    );
  }

  return (
    <div className={classes.chess}>
      <FullScreenDialog />
      <ResultModal />
      {opponentComponent}
      <Buttons />
    </div>
  );
};

export default Layout;
