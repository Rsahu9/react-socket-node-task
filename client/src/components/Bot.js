import React, { Component, Fragment } from 'react';
import { bot } from '../socket';
import Navbar from './Navbar';
import ChatWindow from './ChatWindow';
import './App.css';

class Bot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: [],
      text: '',
      username: '',
    }
  }

  scrollChat = () => {
    this.chatScreen && this.chatScreen.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  componentDidUpdate = () => {
    this.scrollChat();
  }

  componentWillMount() {
    const this2 = this;
    let temp = [];

    bot.on('bot_message', function(msg) {
      if (msg.username.toString() === 'Bot') {
        msg.align = 'left';
      } else {
        msg.align = 'right';
      }
      temp = [...this2.state.message, msg];
      this2.setState({
        message: temp,
        text: '',
      });
    });
  }

  componentDidMount() {
    const name = window.localStorage.getItem('username');
    this.setState({
      username: name,
    });
  }

  handleLogout = () => {
    window.localStorage.clear();
    this.props.history.push('/login');
  }

  handleSubmit = (e) => {
    const { text, username, message } = this.state;

    if (!text) return;

    const msg = {
      text,
      username,
      align: 'right',
    }
    let temp = [...message];

    if(e.type === 'keyup' && (e.which || e.keyCode) === 13 ) {
      temp = [ ...temp, msg ];
      bot.emit('bot_message',{ text, username });
    } else if(e.type === 'click') {
      temp = [ ...temp, msg ];
      bot.emit('bot_message',{ text, username });
    }
    this.setState({
      message: temp,
    });
  }

  render() {
    const { message, text } = this.state;
    return (
      <Fragment>
        <Navbar logout={this.handleLogout} />
        <ChatWindow 
          refs={elem => { this.chatScreen = elem }}
          message={message}
          text={text} 
          handleSubmit={this.handleSubmit} 
          onChange={(data) => this.setState({text: data})}
        />
      </Fragment>
    );
  }
}

export default Bot;
