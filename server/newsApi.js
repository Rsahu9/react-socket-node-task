const axios = require('axios');

const getNewsFromApi = async (news) => {
  const newsURL = 'https://newsapi.org/v2/top-headlines?' +
      'country=in&' +
      'apiKey=8cbd493fcd814c4e9109224242129e02';
  const { data: { articles } } = await axios.get(newsURL);
  news.emit('news_headlines', articles);
}

module.exports = getNewsFromApi;