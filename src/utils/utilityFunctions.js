export const getAvailableSquares = (game, sourceSquare) => {
  const availableMoves = game.moves({ square: sourceSquare });

  const squares = [];
  for (let square of availableMoves) {
    // skip king or queen side castling
    if (square === "O-O" || square === "O-O-O") {
      continue;
    } else if (square.length === 3 && !square.endsWith("#")) {
      // if a pawn gives check without capturing a piece
      if (square.endsWith("+")) {
        square = square.substr(0, 2);
      }
      // regular move for pieces other than pawn
      else {
        square = square.substr(1);
      }
    } else if (
      square.length === 4 &&
      !square.endsWith("#") &&
      !square.includes("=")
    ) {
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
    else if (
      square.length === 5 &&
      !square.endsWith("#") &&
      !square.includes("=")
    ) {
      square = square.substr(2, 2);
    }
    // if pawn goes to the 8th row and changes into something else
    else if (square.includes("=")) {
      // console.log(square);
      square = square.split("=")[0].slice(-2);
    }
    // if checkmate
    else if (square.endsWith("#")) {
      square = square.slice(-3).substring(0, 2);
    }

    // for some reason if the square is not found then skip it
    if (!document.querySelector(`[data-square="${square}"]`)) {
      continue;
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
export const isInCheck = (game, inCheck, setInCheck, classes) => {
  const blackKing = { type: "k", color: "b" };
  const whiteKing = { type: "k", color: "w" };

  const kingSquareWhite = getPiecePositions(game, whiteKing)[0];
  const kingSquareBlack = getPiecePositions(game, blackKing)[0];

  const squareElementWhiteKing = document.querySelector(
    `[data-square="${kingSquareWhite}"]`
  );
  const squareElementBlackKing = document.querySelector(
    `[data-square="${kingSquareBlack}"]`
  );

  const turn = game.turn();

  if (game.in_check()) {
    setInCheck({
      ...inCheck,
      element: turn === "b" ? squareElementBlackKing : squareElementWhiteKing,
      value: true,
    });
  } else if (!game.in_check()) {
    const prevCheckSquare = document.querySelector(`.${classes.inCheck}`);

    setInCheck({
      ...inCheck,
      element: prevCheckSquare,
      value: false,
    });
  }
};
