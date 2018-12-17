const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8000;
const db = require('./db');
const cors = require('cors');
const app = express();
const Chat = require('./model/chat');
const routes = require('./routes');
const server = http.createServer(app);
const io = socketIo(server);
const getNewsFromApi = require('./newsApi');

app.use(cors("*"));
app.use(routes);

const chats = io.of('/chat')
  .on("connection", socket => {
  console.log(socket);
  socket.on('message', async (data) => {
    const chat = new Chat({
      username: data.username,
      text: data.text,
    });
    chat.save();
    chats.emit('message', data)
  })

  socket.on("disconnect", () => console.log("Client disconnected"));
});
 
const bot = io.of('/bot')
  .on('connection', socket => {
    socket.on('bot_message', async (data) => {
      switch(data.text.toUpperCase()){
        case 'HI':
          bot.emit('bot_message', { text: `Hello ${data.username}`, username: 'Bot' });
          break;
        
        default:
          bot.emit('bot_message', { text: `${data.username}, I don't understand what you say.`, username: 'Bot' });
      }
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
  })

const news = io.of('/news')
  .on("connection", socket => {
    socket.on('get_news', async () => {
      getNewsFromApi(news);
    })
    socket.on('news_headlines', async () => {
    setInterval(() => getNewsFromApi(news), 300000)
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
  })

server.listen(port, () => console.log(`Listening on port ${port}`));