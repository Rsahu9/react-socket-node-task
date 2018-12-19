const axios = require('axios');

const getMessageFromBotApi = async (bot,text) => {
  const accessToken = 'c394674efc18424b8ae7fe711c66e9f1';
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