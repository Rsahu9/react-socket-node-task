const express = require("express"),
      http = require("http"),
      socketIo = require("socket.io"),
      port = process.env.PORT || 8000,
      db = require('./db'),
      cors = require('cors'),
      app = express(),
      Chat = require('./model/chat'),
      routes = require('./routes'),
      server = http.createServer(app),
      io = socketIo(server),
      getNewsFromApi = require('./newsApi'),
      getMessageFromBotApi = require('./botApi');

app.set('socketio', io);
app.use(cors("*"));
app.use(routes);
app.use(express.static(__dirname));

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
      emoji: [ ...data.emoji ],
    });
    chat.save();
    chats.emit('message', chat)
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