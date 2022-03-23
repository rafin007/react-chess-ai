export const getAvailableSquares = (game, sourceSquare) => {
  const availableMoves = game.moves({ square: sourceSquare });

  const squares = [];
  for (let square of availableMoves) {
    // skip king or queen side castling
    if (square === "O-O" || square === "O-O-O") {
      continue;
    } else if (square.length === 3) {
      // if a pawn gives check without capturing a piece
      if (square.endsWith("+")) {
        square = square.substr(0, 2);
      }
      // regular move for pieces other than pawn
      else {
        square = square.substr(1);
      }
    } else if (square.length === 4) {
      // if a piece other than pawn gives check without capturing a piece
      if (square.endsWith("+")) {
        square = square.substr(1, 2);
      }
      // if a piece can capture another piece
      else {
        square = square.substr(2);
      }
    }
    // if a piece can give a check by capturing another piece
    else if (square.length === 5) {
      square = square.substr(2, 2);
    }
    squares.push(document.querySelector(`[data-square="${square}"]`));
  }

  return squares;
};

// get squares where certain pieces are
const getPiecePositions = (game, piece) => {
  return []
    .concat(...game.board())
    .map((p, index) => {
      if (p !== null && p.type === piece.type && p.color === piece.color) {
        return index;
      }
    })
    .filter(Number.isInteger)
    .map((pieceIndex) => {
      const row = "abcdefgh"[pieceIndex % 8];
      const column = Math.ceil((64 - pieceIndex) / 8);
      return row + column;
    });
};

// if the king is in check then color that square
export const isInCheck = (game, inCheck, setInCheck) => {
  if (game.in_check()) {
    let king;
    if (game.turn() === "b") {
      king = { type: "k", color: "b" };
    } else {
      king = { type: "k", color: "w" };
    }
    const kingSquare = getPiecePositions(game, king)[0];

    const squareElement = document.querySelector(
      `[data-square="${kingSquare}"]`
    );

    setInCheck({ element: squareElement, value: true });
  } else if (!game.in_check()) {
    setInCheck({ ...inCheck, value: false });
  }
};
