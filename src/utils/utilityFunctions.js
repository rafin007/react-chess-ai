export const getAvailableSquares = (availableMoves) => {
  const squares = [];
  availableMoves.forEach((square) => {
    if (square.length === 3) {
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
  });

  return squares;
};
