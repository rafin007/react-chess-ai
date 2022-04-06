import { useRef, useState, useEffect } from "react";
import Chess from "chess.js";
import { getAvailableSquares, isInCheck } from "../../utils/utilityFunctions";
import classes from "../Chess.module.css";

import { Chessboard } from "react-chessboard";

export default function PlayerVsPlayer({ boardWidth }) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [inCheck, setInCheck] = useState({ element: null, value: false });

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

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
    isInCheck(game, inCheck, setInCheck);

    return move;
  }

  return (
    <>
      <Chessboard
        id="PlayVsPlay"
        animationDuration={200}
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDragBegin={highlightAvailableMoves}
        onPieceDragEnd={unhighlightAvailableMoves}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        }}
        ref={chessboardRef}
      />
      {/* <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.reset();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        reset
      </button>
      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        undo
      </button> */}
    </>
  );
}
