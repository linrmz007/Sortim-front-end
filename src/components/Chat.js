import React, { Component } from 'react';
import './Chat.css';
import '../animate.css';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';


class Chat extends Component {

  constructor(props){
    super(props);
    console.log(this.props.authObj.picture.data.url, 'eyyy');

    this.state = {
      self: false,
      other: false,
    }
  }

  captureMessageEnter = (e) => {
   if(e.key !== 'Enter') return;
   this.handleMessages();

 }

  handleMessages = (message) => {
    if(this.message.value === '') return;
    this.props.sendMessage(this.message.value);
    this.message.value = '';
  }

renderList(){
  console.log('messages', this.props.messages);

  if (this.props.messages === []) return null;
    return this.props.messages.map((msg, i) => {
      console.log(msg.room.ourId, this.props.myId);

      const className = msg.room.ourId === this.props.myId ? 'self': 'other';

      if(msg)
      return (

          <div className="animated fadeIn" key={i}>

            <li className={className}>
              <div className="messages">
                <p>{msg.msg}</p>
                <time>1 minute ago</time>
              </div>
            </li>
          </div>

      )
    })
  }

  // <div
  //    key={i}
  //    style={style}>
  //     <li className="msg-list">{msgObj.msg}</li>
  // </div>

  render() {


    return (
      <section className="module">
      <div className='animated fadeInLeftBig'>
        <header className="top-bar">
          <div className="left">
            <span className="icon typicons-message"></span>
            <span className='chat-logo'>Sortim Chat</span>
            <div className="avatar">
            <img src={this.props.otherUsers[0].img}/>
            <img src={this.props.authObj.picture.data.url}/>
            </div>
          </div>
          <div className="right">
            <span className="icon typicons-minus"></span>
            <span className="icon typicons-times"></span>
          </div>

        </header>

        <ol className="discussion">
        {this.renderList()}

        </ol>

        <div>
          <input ref={input => this.message = input} onKeyPress={this.captureMessageEnter} className="chat__input"/>
          <input onClick={this.handleMessages} className="button-primary" type="submit" className="chat__button" value="Send"/>
        </div>
        </div>
      </section>



    );
  }
}

const mapStateToProps = (state) => ({
  authObj: state.auth.authObj,
  otherUsers: state.entities.otherUsers,
})

export default connect(mapStateToProps)(Chat);
