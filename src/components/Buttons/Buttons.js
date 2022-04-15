import { Button } from "@mui/material";
import React, { useContext } from "react";
import {
  ChessboardRefContext,
  GameContext,
  MenuContext,
} from "../../Contexts/GameContext";
import classes from "./Buttons.module.css";

export default function Buttons() {
  const { game, setGame } = useContext(GameContext);
  const chessboardRef = useContext(ChessboardRefContext);
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  return (
    <div className={classes.buttons}>
      <Button
        variant="outlined"
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
            game.undo();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        Undo
      </Button>
      <Button variant="outlined" onClick={() => setOpenMenu(true)}>
        Menu
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          safeGameMutate((game) => {
            game.reset();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        Reset
      </Button>
    </div>
  );
}
