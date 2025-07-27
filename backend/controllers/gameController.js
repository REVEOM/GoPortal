const GoGame = require('../game/goGame');

const games = new Map();

const createGame = (req, res) => {
  const { size = 19 } = req.body;
  if (![9, 13, 19].includes(size)) {
    return res.status(400).json({ error: 'Invalid board size. Use 9, 13, or 19.' });
  }

  const game = new GoGame(size);
  games.set(game.id, game);

  res.json({
    gameId: game.id,
    gameState: game.getGameState()
  });
};

const getGameState = (req, res) => {
    const game = games.get(req.params.gameId);

    if (!game) {
    return res.status(404).json({ error: 'Game not found' });
    }
  
    res.json(game.getGameState());
}

const makeMove = (req, res) => {
    const game = games.get(req.params.gameId);
    
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    const { x, y } = req.body;
    
    if (typeof x !== 'number' || typeof y !== 'number') {
        return res.status(400).json({ error: 'Invalid move coordinates' });
    }
    
    const result = game.makeMove(x, y);
    
    if (!result.success) {
        return res.status(400).json({ error: result.error });
    }
    
    res.json(result);
}

const passTurn = (req, res) => {
  const game = games.get(req.params.gameId);
  
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  const result = game.pass();
  
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  
  res.json(result);
}

const getMoveHistory = (req, res) => {
  const game = games.get(req.params.gameId);
  
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  res.json({
    moves: game.moveHistory,
    totalMoves: game.moveHistory.length
  });
}

const getCurrentScore = (req, res) => {
  const game = games.get(req.params.gameId);

  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }

  const score = game.getCurrentScore();
  res.json(score);
}

const endGame = (req, res) => {
  const game = games.get(req.params.gameId);
  
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  if (!game.gameEnded) {
    game.endGame();
  }
  
  res.json(game.getGameState());
}

const listAllGames = (req, res) => {
  const gameList = Array.from(games.values()).map(game => ({
    id: game.id,
    size: game.size,
    currentPlayer: game.currentPlayer,
    moveCount: game.moveHistory.length,
    score,
    gameEnded: game.gameEnded,
    createdAt: game.moveHistory[0]?.timestamp || Date.now()
  }));
  
  res.json({ games: gameList });
}

// getGameState, makeMove, passTurn, endGame, getScore...

module.exports = {
  createGame,
  getGameState,
  makeMove,
  passTurn,
  getMoveHistory,
  getCurrentScore,
  endGame,
  listAllGames,
  games
};
