const http = require('http');
const app = require('./config/server');
const gameRoutes = require('./routes/gameRoutes');
const socketIO = require('socket.io');
const socketHandler = require('./sockets/socketHandler');

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});

app.use('/api', gameRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`HTTP+Socket sunucusu çalışıyor: http://localhost:${PORT}`);
});

socketHandler(io);