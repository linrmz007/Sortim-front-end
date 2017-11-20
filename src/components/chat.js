import React, { Component } from 'react';



class Chat extends Component {
  constructor(props){
    super(props)
    this.renderList()
  }

  captureMessageEnter = (e) => {
    if(e.key !== 'Enter') return;
    this.handleMessages();
  }

  handleMessages = () => {
    if(this.message.value === '') return;
    this.props.onSendMessage(this.message.value);
    this.message.value = '';
  }

  renderList() {
    if (this.props.messages === []) return null;
    const msgs = Object.keys(this.props.messages)
    return msgs.map((msg, i) => {
      const msgObj = this.props.messages[msg];
      return (<div key={i}>
        <li> Content: {msgObj.message}</li>
        <li>Author: {msgObj.author}</li>
        </div>
      )
    })
  }

  //////////////////=============== RENDERING
  render() {
    return (
      <div className="chat__wrapper">
        <ul>{this.renderList()}</ul>
        <ul className="chat__messages"></ul>
        <input ref={input => this.message = input} onKeyPress={this.captureMessageEnter} className="chat__input"/>
        <button onClick={this.handleMessages} className="chat__button">Send</button>
      </div>
    );
  }
}

export default Chat;
