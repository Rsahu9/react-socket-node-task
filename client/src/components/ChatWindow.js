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
    <ul className="messages" >
      { props.message.map(({ text, file, username, align = 'left' }, index) => (
        <div className="message_template" key={index} ref={props.refs}>
          <li className={`message ${align}`}>
            <div className="avatar"><span className='message-username'>{username}</span></div>
            <div className="text_wrapper">
              { text 
                ? <div className="text">{text}</div> 
                : <img src={`http://localhost:8000/${file.path}`} alt='shared_image' className='shared-image'/> }

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
      <div className="send_files">
        <input type='file' onChange={props.handleSubmitFile} className='file-input' name='attachments' />
      </div>
      <div className="send_message" onClick={props.handleSubmit} >
        <div className="icon"></div>
        <div className="text">Send</div>
      </div>
    </div>
  </div>
);

export default ChatWindow;