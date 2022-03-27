import { getPieceValue } from "./boardPositions";

// the evaluation function for minimax
const evaluateBoard = (board) => {
  let totalEvaluation = 0;
  for (const i = 0; i < 8; i++) {
    for (const j = 0; j < 8; j++) {
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
    }
  }
  return totalEvaluation;
};

// minimax with alhpha-beta pruning and search depth d = 3 levels
const minimax = (game, depth, alpha, beta, isMaximisingPlayer) => {
  if (depth === 0) {
    return -evaluateBoard(game.board());
  }

  const possibleNextMoves = game.moves();
  const numPossibleMoves = possibleNextMoves.length;

  if (isMaximisingPlayer) {
    let bestMove = -9999;
    for (const i = 0; i < numPossibleMoves; i++) {
      game.move(possibleNextMoves[i]);
      bestMove = Math.max(
        bestMove,
        minimax(game, depth - 1, alpha, beta, !isMaximisingPlayer)
      );
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
  } else {
    let bestMove = 9999;
    for (const i = 0; i < numPossibleMoves; i++) {
      game.move(possibleNextMoves[i]);
      bestMove = Math.min(
        bestMove,
        minimax(game, depth - 1, alpha, beta, !isMaximisingPlayer)
      );
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
  }

  return bestMove;
};

// uses the minimax algorithm with alpha beta pruning to caculate the best move
export const calculateBestMove = (game) => {
  const possibleNextMoves = game.moves();
  let bestMove = -9999;
  let bestMoveFound;

  for (const i = 0; i < possibleNextMoves.length; i++) {
    const possibleNextMove = possibleNextMoves[i];
    game.move(possibleNextMove);
    const value = minimax(game, minimaxDepth, -10000, 10000, false);
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = possibleNextMove;
    }
  }
  return bestMoveFound;
};
