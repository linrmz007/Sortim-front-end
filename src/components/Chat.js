import React, { Component } from 'react';


class Chat extends Component {

  constructor(props){
    super(props);
  }

  captureMessageEnter = (e) => {
   if(e.key !== 'Enter') return;
   this.handleMessages();
 }

  handleMessages = (message) => {
    if(this.message.value === '') return;
    console.log(this.props, 'string');
    this.props.sendMessage(this.message.value);
    this.message.value = '';
  }

renderList(){
  if (this.props.messages === []) return null;
    const msgs = Object.keys(this.props.messages);
    return msgs.map((msg, i) => {
      const msgObj = this.props.messages[msg];
      if(msgObj)
      return (<div key={i}>
        <li className="msg-list">{msgObj.msg}</li>
        </div>
      )
    })
  }

// renderList(){
//   if (this.props.messages === []) return null;
//     const msgs = this.props.messages;
//     return msgs.map((msg, i) => {
//       return (<div key={i}>
//         <li className="msg-list">{msg}</li>
//         </div>
//       )
//     })
//   }

  render() {


    return (
      <div className="sortim-chat">
        <h2>Sortim Chat</h2>
        <ul className='chat-list'>{this.renderList()}</ul>
          <div className="chat-window">
            <div className="output"></div>
            <div className="feedback"></div>
          </div>
            <input ref={input => this.message = input} onKeyPress={this.captureMessageEnter} className="chat__input"/>
          <div>
          <button onClick={this.handleMessages} className="chat__button">Send</button>
          </div>
      </div>
    );
  }
}

export default Chat;
