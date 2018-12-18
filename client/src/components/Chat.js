import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { socket } from '../socket';
import Navbar from './Navbar';
import { baseURL } from '../config';
import ChatWindow from './ChatWindow';
import './App.css';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: [],
      text: '',
      username: '',
    }
  }

  componentWillMount() {
    const this2 = this;
    let temp = [];

    socket.on('message', function(msg) {
      const text = this2.alignText(msg);    
      temp = [...this2.state.message, text];
      this2.setState({
        message: temp,
        text: '',
      });
    });
  }

  scrollChat = () => {
    this.chatScreen.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  componentDidUpdate = () => {
    this.scrollChat();
  }

  componentDidMount= async () => {
    const { data } = await axios.get(`${baseURL}/chats`);
    const name = window.localStorage.getItem('username');
    data.forEach((text) => this.alignText(text));
    this.setState({
      username: name,
      message: data,
    });
    this.scrollChat();
  }

  alignText = (text) => {
    const username = window.localStorage.getItem('username');
    
    if (text.username.toString() === username.toString()) {
      text.align = 'right';
    } else {
      text.align = 'left';
    }
    return text;
  }

  handleLogout = () => {
    window.localStorage.clear();
    this.props.history.push('/login');
  }

  handleSubmit = (e) => {
    const { text, username } = this.state;
    if(e.type === 'keyup' && (e.which || e.keyCode) === 13 ) {
      socket.emit('message',{ text, username });
    } else if(e.type === 'click') {
      socket.emit('message',{ text, username });
    }
  }

  render() {
    const { message, username, text } = this.state;
    return (
      <Fragment>
        <Navbar logout={this.handleLogout} />
        <ChatWindow 
          message={message} 
          text={text}
          onChange={(data) => this.setState({text: data})} 
          refs={elem => { this.chatScreen = elem }}
          username={username} 
          handleSubmit={this.handleSubmit} 
        />
      </Fragment>
    );
  }
}

export default Chat;
