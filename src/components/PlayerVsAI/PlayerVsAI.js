import { useState, useEffect, useContext } from "react";
import classes from "../Chess.module.css";

import { Chessboard } from "react-chessboard";
import { getAvailableSquares, isInCheck } from "../../utils/utilityFunctions";
import { calculateBestMove } from "../../AI/minimax";
import {
  ChessboardRefContext,
  DifficultyContext,
  GameContext,
  ModalContext,
} from "../../Contexts/GameContext";

export default function PlayerVsAI({ boardWidth }) {
  const chessboardRef = useContext(ChessboardRefContext);
  const { game, setGame } = useContext(GameContext);
  const { difficulty, setDifficulty } = useContext(DifficultyContext);
  const [arrows, setArrows] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [currentTimeout, setCurrentTimeout] = useState(undefined);
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
          message: "You have been checkmated!",
          value: true,
        });
      } else {
        setOpenModal({
          ...openModal,
          message: "Congrats! You won!",
          value: true,
        });
      }
    }
  }, [game]);

  function makeRandomMove() {
    const possibleMoves = game.moves();

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });

    isInCheck(game, inCheck, setInCheck, classes);
  }

  const makeAiMove = () => {
    const bestMove = calculateBestMove(game, difficulty);

    if (game.game_over() || game.in_draw()) {
      return;
    }

    const gameCopy = { ...game };

    gameCopy.move(bestMove);

    setGame(gameCopy);

    isInCheck(gameCopy, inCheck, setInCheck, classes);
  };

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
  }, [inCheck.value]);

  function onDrop(sourceSquare, targetSquare) {
    // unhighlight the board square after a move
    unhighlightAvailableMoves(null, sourceSquare);

    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    // illegal move
    if (move === null) return false;

    setGame(gameCopy);
    // if there is a check
    isInCheck(game, inCheck, setInCheck, classes);

    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    const newTimeout = setTimeout(makeAiMove, 100);
    setCurrentTimeout(newTimeout);
    return true;
  }

  return (
    <Chessboard
      id="PlayerVsAI"
      animationDuration={200}
      boardOrientation={boardOrientation}
      boardWidth={boardWidth}
      customArrows={arrows}
      position={game.fen()}
      onPieceDrop={onDrop}
      onPieceDragBegin={highlightAvailableMoves}
      onPieceDragEnd={unhighlightAvailableMoves}
      ref={chessboardRef}
    />
  );
}
