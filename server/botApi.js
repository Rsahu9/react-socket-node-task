const axios = require('axios');

const getMessageFromBotApi = async (bot,text) => {
  const accessToken = 'YOUR_API.AI_CLIENT_ACCESS_TOKEN';
  const baseUrl = "https://api.api.ai/v1/";
  
  const { data: { result } } = await axios({
    method: "post",
    url: baseUrl + "query",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: { query: text, lang: "en", sessionId: "rahul" },
    headers: {
      "Authorization": "Bearer " + accessToken
    },
  });
  
  const message = {
    username: 'Bot',
    text: result.speech
  }
  
  bot.emit('bot_message', message);
}

module.exports = getMessageFromBotApi;