import React, { useState, useRef } from "react";
import {
  ChessboardRefContext,
  DifficultyContext,
  GameContext,
  OpponentContext,
} from "../../Contexts/GameContext";
import Chess from "chess.js";

const ContextLayers = (props) => {
  const [game, setGame] = useState(new Chess());
  const chessboardRef = useRef();
  const [opponent, setOpponent] = useState("");
  const [difficulty, setDifficulty] = useState("");

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <ChessboardRefContext.Provider value={chessboardRef}>
        <OpponentContext.Provider value={{ opponent, setOpponent }}>
          <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
            {props.children}
          </DifficultyContext.Provider>
        </OpponentContext.Provider>
      </ChessboardRefContext.Provider>
    </GameContext.Provider>
  );
};

export default ContextLayers;
