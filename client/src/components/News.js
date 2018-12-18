import React,{ Component, Fragment } from 'react';
import { news } from '../socket';
import Navbar from './Navbar';

class News extends Component{
  state = {
    headlines:[],
    loading: true
  }

  componentWillMount() {
    const this2 = this;

    news.emit('get_news');
    news.on('news_headlines', function(headlines){
      console.log(headlines);
      this2.setState({ headlines, loading: false });
    });
  }

  handleLogout = () => {
    window.localStorage.clear();
    this.props.history.push('/login');
  }

  componentDidMount() {
    news.emit('news_headlines');
  }

  render(){
    return(
      <Fragment>
        <Navbar logout={this.handleLogout} />
        <div className='container'>
          { !this.state.loading 
            ? this.state.headlines.map(({ description, content, title, url, urlToImage }, index) => (
              <div className="card" key={index}>
                <img className="card-img-top" src={urlToImage} alt="Card"/>
                <div className="card-body">
                  <h4 className="card-title">{title}</h4>
                  <p className="card-text">{description}</p>
                  <p className="card-text"><b>Content:</b>{content}</p>
                  <a href={url} className="btn btn-primary">See Full News</a>
                </div>
              </div>
              ))
            : <div className='loader'><img src='ajax-loader.gif' alt='loader' /></div> 
          }
        </div>
      </Fragment>
    );
  }
}
 
export default News;