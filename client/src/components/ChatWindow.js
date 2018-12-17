import React from 'react';

const ChatWindow = (props) => (
  <div className="chat_window">
    <div className="top_menu">
      <div className="buttons">
        <div className="button close"></div>
        <div className="button minimize"></div>
        <div className="button maximize"></div>
      </div>
      <div className="title">{props.username || 'Bot'}</div>
    </div>
    <ul className="messages" ref={props.refs}>
      { props.message.map(({ text, align = 'left' }, index) => (
        <div className="message_template" key={index}>
          <li className={`message ${align}`}>
            <div className="avatar"></div>
            <div className="text_wrapper">
              <div className="text">{text}</div>
            </div>
          </li>
        </div>
        )) 
      }
    </ul>
    <div className="bottom_wrapper clearfix">
      <div className="message_input_wrapper">
        <input 
          className="message_input" 
          placeholder="Type your message here..." 
          value={props.text}
          onChange={(e) => props.onChange(e.target.value)}
          onKeyUp={props.handleSubmit}
        />
      </div>
      <div className="send_message" onClick={props.handleSubmit} >
        <div className="icon"></div>
        <div className="text">Send</div>
      </div>
    </div>
  </div>
);

export default ChatWindow;