import React, { useState, useRef } from "react";
import {
  ChessboardRefContext,
  DifficultyContext,
  GameContext,
  MenuContext,
  ModalContext,
  OpponentContext,
} from "../../Contexts/GameContext";
import Chess from "chess.js";

const ContextLayers = (props) => {
  const [game, setGame] = useState(new Chess());
  const chessboardRef = useRef();
  const [opponent, setOpponent] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [openMenu, setOpenMenu] = useState(true);
  const [openModal, setOpenModal] = useState({ message: "", value: false });

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <ChessboardRefContext.Provider value={chessboardRef}>
        <OpponentContext.Provider value={{ opponent, setOpponent }}>
          <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
            <MenuContext.Provider value={{ openMenu, setOpenMenu }}>
              <ModalContext.Provider value={{ openModal, setOpenModal }}>
                {props.children}
              </ModalContext.Provider>
            </MenuContext.Provider>
          </DifficultyContext.Provider>
        </OpponentContext.Provider>
      </ChessboardRefContext.Provider>
    </GameContext.Provider>
  );
};

export default ContextLayers;
