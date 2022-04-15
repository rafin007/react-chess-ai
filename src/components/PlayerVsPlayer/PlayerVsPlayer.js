import { useState, useEffect, useContext } from "react";
import { getAvailableSquares, isInCheck } from "../../utils/utilityFunctions";
import classes from "../Chess.module.css";

import { Chessboard } from "react-chessboard";
import {
  ChessboardRefContext,
  GameContext,
  ModalContext,
} from "../../Contexts/GameContext";

export default function PlayerVsPlayer({ boardWidth }) {
  const chessboardRef = useContext(ChessboardRefContext);

  const { game, setGame } = useContext(GameContext);
  const [inCheck, setInCheck] = useState({ element: null, value: false });
  const { openModal, setOpenModal } = useContext(ModalContext);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  useEffect(() => {
    if (game.in_checkmate()) {
      if (game.turn() === "w") {
        setOpenModal({
          ...openModal,
          message: "Black won!",
          value: true,
        });
      } else {
        setOpenModal({
          ...openModal,
          message: "White won!",
          value: true,
        });
      }
    }
  }, [game]);

  function highlightAvailableMoves(piece, sourceSquare) {
    const squares = getAvailableSquares(game, sourceSquare);

    squares.forEach((square) => {
      square.classList.add(classes.highlight);
    });
  }

  function unhighlightAvailableMoves(piece, sourceSquare) {
    const squares = getAvailableSquares(game, sourceSquare);

    squares.forEach((square) => {
      square.classList.remove(classes.highlight);
    });
  }

  // if in check change the color of the square, otherwise remove it
  useEffect(() => {
    if (inCheck.element !== null) {
      if (inCheck.value) {
        inCheck.element.classList.add(classes.inCheck);
      } else {
        inCheck.element.classList.remove(classes.inCheck);
      }
    }
  }, [inCheck]);

  function onDrop(sourceSquare, targetSquare) {
    unhighlightAvailableMoves(null, sourceSquare);

    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    setGame(gameCopy);

    // if there is a check
    isInCheck(game, inCheck, setInCheck, classes);

    return move;
  }

  return (
    <Chessboard
      id="PlayerVsPlayer"
      animationDuration={200}
      boardWidth={boardWidth}
      position={game.fen()}
      onPieceDragBegin={highlightAvailableMoves}
      onPieceDragEnd={unhighlightAvailableMoves}
      onPieceDrop={onDrop}
      ref={chessboardRef}
    />
  );
}
