const io = require('./socket');

const SocketManager = (socket) => {
  socket.on('message', async (data) => {
    io.emit('message', data)
  })
  socket.on("disconnect", () => console.log("Client disconnected"));
}

module.exports = SocketManager;


