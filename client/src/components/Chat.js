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
      username: window.localStorage.getItem('username'),
      online: [],
      emojiArray: [],
      showEmojiPicker: false
    }
    this.chatScreen = '';
  }

  componentWillMount() {
    const this2 = this;
    let temp = [];

    socket.on('online', function(users) {
      temp = [...this2.state.online, ...users];
      this2.setState({
        online: temp
      });
    })

    socket.on('message', function(msg) {
      const text = this2.alignText(msg);    
      temp = [...this2.state.message, text];
      this2.setState({
        message: temp,
        text: '',
        emojiArray: [],
        showEmojiPicker: false,
      });
    });
  }

  scrollChat = () => {
    this.chatScreen && this.chatScreen.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  componentDidUpdate = () => {
    this.scrollChat();
  }

  componentDidMount= async () => {
    const { data } = await axios.get(`${baseURL}/chats`);
    data.forEach((text) => this.alignText(text));
    
    socket.emit('online',{ username: this.state.username });
    
    this.setState({
      message: data,
    });
    this.scrollChat();
  }

  alignText = (text) => {
   
    if (text.username.toString() === this.state.username.toString()) {
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

  handleSubmitFile = (event) => {
    let file = new FormData();
    file.append('attachment', event.target.files[0]);
    file.append('name', 'attachment');
    file.append('username', this.state.username);

    axios({
      method: "post",
      url: baseURL + "/item/upload",
      encType:"multipart/form-data",
      data: file,
    });
  }

  handleSubmit = (e) => {
    const { text, username, emojiArray } = this.state;
    if (e.type === 'keyup' && (e.which || e.keyCode) === 13 ) {
      socket.emit('message',{ text, emoji: emojiArray, username });
    } else if (e.type === 'click') {
      socket.emit('message',{ text, emoji: emojiArray, username });
    }
  }

  handleEmojiSelect = (emoji) => {
    const currentEmoji = [ ...this.state.emojiArray, emoji ];
    this.setState({ 
      emojiArray: currentEmoji, 
      text: this.state.text + '' + emoji.native, 
    });
  }

  render() {
    const { message, username, text, online, showEmojiPicker } = this.state;
    return (
      <Fragment>
        <Navbar logout={this.handleLogout} online={online}/>
        <ChatWindow 
          message={message} 
          text={text}
          onChange={(data) => this.setState({text: data})} 
          refs={elem => { this.chatScreen = elem }}
          username={username} 
          handleSubmit={this.handleSubmit}
          handleSubmitFile={this.handleSubmitFile}
          showEmojiPicker={showEmojiPicker}
          onClick={ (e) => this.setState({ showEmojiPicker: !showEmojiPicker }) } 
          onEmojiSelect={this.handleEmojiSelect}
        />
      </Fragment>
    );
  }
}

export default Chat;
