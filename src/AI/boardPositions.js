import {
  whiteBishopEval,
  whiteKingEval,
  whitePawnEval,
  whiteRookEval,
  blackBishopEval,
  blackKingEval,
  blackPawnEval,
  blackRookEval,
  knightEval,
  evalQueen,
} from "./pieceEvaluations";

const getAbsoluteValue = (piece, isWhite, x, y) => {
  if (piece.type === "p") {
    return 10 + (isWhite ? whitePawnEval[y][x] : blackPawnEval[y][x]);
  } else if (piece.type === "r") {
    return 50 + (isWhite ? whiteRookEval[y][x] : blackRookEval[y][x]);
  } else if (piece.type === "n") {
    return 30 + knightEval[y][x];
  } else if (piece.type === "b") {
    return 30 + (isWhite ? whiteBishopEval[y][x] : blackBishopEval[y][x]);
  } else if (piece.type === "q") {
    return 90 + evalQueen[y][x];
  } else if (piece.type === "k") {
    return 900 + (isWhite ? whiteKingEval[y][x] : blackKingEval[y][x]);
  }
};

export const getPieceValue = (piece, x, y) => {
  if (piece === null) {
    return 0;
  }

  const absoluteValue = getAbsoluteValue(piece, piece.color === "w", x, y);

  if (piece.color === "w") {
    return absoluteValue;
  } else {
    return -absoluteValue;
  }
};
