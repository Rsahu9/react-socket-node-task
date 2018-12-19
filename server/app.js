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
const getMessageFromBotApi = require('./botApi');

app.use(cors("*"));
app.use(routes);

let users = [];

const chats = io.of('/chat')
  .on("connection", socket => {

  socket.on('online', async (data) => {
    if(!users.includes(data.username)) {
      users.push(data.username);
    }
    chats.emit('online', users);
  })

  socket.on('message', async (data) => {
    const chat = new Chat({
      username: data.username,
      text: data.text,
    });
    chat.save();
    chats.emit('message', data)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected")
  });
});
 
const bot = io.of('/bot')
  .on('connection', socket => {
    socket.on('bot_message', async (data) => {
      getMessageFromBotApi(bot,data.text);
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