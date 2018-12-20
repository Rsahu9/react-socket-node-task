const axios = require('axios');

const getNewsFromApi = async (news) => {

  const newsURL = 'https://newsapi.org/v2/top-headlines?' + 
      'country=in&' + 
      'apiKey=YOUR_NEWS_API_KEY';
  
  const { data: { articles } } = await axios.get(newsURL);
  news.emit('news_headlines', articles);
}

module.exports = getNewsFromApi;