import { useRef, useState, useEffect } from "react";
import Chess from "chess.js";
import classes from "../Chess.module.css";

import { Chessboard } from "react-chessboard";
import { getAvailableSquares, isInCheck } from "../../utils/utilityFunctions";

export default function PlayerVsRandom({ boardWidth }) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [arrows, setArrows] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [currentTimeout, setCurrentTimeout] = useState(undefined);
  const [inCheck, setInCheck] = useState({ element: null, value: false });

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    const gameCopy = { ...game };

    // safeGameMutate((game) => {
    //   game.move(possibleMoves[randomIndex]);
    // });
    gameCopy.move(possibleMoves[randomIndex]);

    setGame(gameCopy);

    isInCheck(game, inCheck, setInCheck);
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
  }, [inCheck.value, inCheck.element]);

  function onDrop(sourceSquare, targetSquare) {
    // unhighlight the board square after a move
    unhighlightAvailableMoves(null, sourceSquare);

    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;

    setGame(gameCopy);

    // if there is a check
    isInCheck(game, inCheck, setInCheck);

    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    const newTimeout = setTimeout(makeRandomMove, 1000);
    setCurrentTimeout(newTimeout);
    return true;
  }

  return (
    // <div className="" >
    <>
      <Chessboard
        id="PlayVsRandom"
        animationDuration={200}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        customArrows={arrows}
        position={game.fen()}
        onPieceDrop={onDrop}
        onPieceDragBegin={highlightAvailableMoves}
        onPieceDragEnd={unhighlightAvailableMoves}
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
          // stop any current timeouts
          clearTimeout(currentTimeout);
        }}
      >
        reset
      </button>
      <button
        className="rc-button"
        onClick={() => {
          setBoardOrientation((currentOrientation) =>
            currentOrientation === "white" ? "black" : "white"
          );
        }}
      >
        flip board
      </button>
      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
          });
          // stop any current timeouts
          clearTimeout(currentTimeout);
        }}
      >
        undo
      </button>
      <button
        className="rc-button"
        onClick={() => {
          setArrows([
            ["a3", "a5"],
            ["g1", "f3"],
          ]);
        }}
      >
        Set Custom Arrows
      </button> */}
    </>
    // </div>
  );
}
