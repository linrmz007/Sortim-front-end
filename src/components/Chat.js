import React, { Component } from 'react';


class Chat extends Component {

  constructor(props){
    super(props);
  }


  handleMessages = (message) => {
    console.log('msg', this.message.value);
  }

renderList(){
  if (this.props.messages === []) return null;
    const msgs = Object.keys(this.props.messages)
    return msgs.map(msg => {
      const msgObj = this.props.messages[msg];
      return (<div>
        <li> Content: {msgObj.message}</li>
        <li>Author: {msgObj.author}</li>
        </div>
      )
    })
  }

  render() {
    const message = this.props.sendMsg;

    return (
      <div className="sortim-chat">
        <h2>Sortim Chat</h2>
        <ul>{this.renderList()}</ul>
          <div className="chat-window">
            <div className="output" onSendMsg={this.handleMessages}><h5>Shit here</h5></div>
            <div className="feedback"></div>
          </div>
            <input className="message" ref={input => this.message = input} type="text" placeholder="Message" />
          <div>
            <button className="send" onClick={this.handleMessages}>Send</button>
          </div>
      </div>
    );
  }
}

export default Chat;
