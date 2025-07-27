const express = require('express');
const router = express.Router();
const {
    createGame,
    getGameState,
    makeMove,
    passTurn,
    getMoveHistory,
    getCurrentScore,
    endGame,
    listAllGames
} = require('../controllers/GameController');

// Yeni oyun oluştur
router.post('/games', createGame);

// Belirli bir oyunun durumunu getir
router.get('/games/:gameId', getGameState);

// Belirli bir oyuna hamle yap
router.post('/games/:gameId/moves', makeMove);

// Belirli bir oyunda pas geç
router.post('/games/:gameId/pass', passTurn);

// Belirli bir oyunun hamle geçmişini getir
router.get('/games/:gameId/history', getMoveHistory);

// Belirli bir oyunun güncel skorunu getir
router.get('/games/:gameId/score', getCurrentScore);

// Belirli bir oyunu erken sonlandır
router.post('/games/:gameId/end', endGame);

router.get('/games', listAllGames);

module.exports = router;
