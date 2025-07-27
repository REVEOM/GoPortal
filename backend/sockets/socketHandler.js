const { games } = require('../controllers/GameController');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Yeni kullanıcı bağlandı: ${socket.id}`);

    // Odaya katılma
    socket.on('joinGame', (gameId) => {
      if (!games.has(gameId)) {
        socket.emit('error', 'Oyun bulunamadı.');
        return;
      }

      socket.join(gameId);
      console.log(`Socket ${socket.id} oyuna katıldı: ${gameId}`);
      socket.emit('joined', { gameId });
    });

    // Taş koyma (hamle yapma)
    socket.on('makeMove', ({ gameId, x, y }) => {
      const game = games.get(gameId);
      if (!game) {
        socket.emit('error', 'Geçersiz oyun ID.');
        return;
      }

      const result = game.makeMove(x, y);

      if (!result.success) {
        socket.emit('moveError', result.error);
      } else {
        // Oyun odasındaki herkese bildir
        io.to(gameId).emit('moveMade', {
          gameId,
          move: {
            x, y,
            player: game.currentPlayer === 1 ? 2 : 1, // çünkü move sonrası player değişti
          },
          gameState: result.gameState
        });
      }
    });

    // Pas geçme
    socket.on('passTurn', ({ gameId }) => {
      const game = games.get(gameId);
      if (!game) {
        socket.emit('error', 'Oyun bulunamadı.');
        return;
      }

      const result = game.pass();
      io.to(gameId).emit('turnPassed', {
        gameId,
        currentPlayer: game.currentPlayer,
        gameEnded: result.gameEnded,
        gameState: result.gameState
      });
    });

    // Bağlantı kopunca
    socket.on('disconnect', () => {
      console.log(`Socket bağlantısı koptu: ${socket.id}`);
    });
  });
};
