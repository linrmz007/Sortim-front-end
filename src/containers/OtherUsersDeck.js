import React, { Component } from 'react';
import Swing from 'react-swing';
import { Direction } from 'swing';
import { connect } from 'react-redux';
import { addOtherUsers, sendMessage, socketConnect, getMessage } from '../actions';
import { getOtherUsers } from '../Service';
import { sendInvite } from '../Service';
import Chat from '../components/Chat.js';


const mockData = [
  {
    author: 'Marc',
    message: 'Wooo!',
    date: Date.now(),
    own: true,
  },
  {
    author: 'Lindsey',
    message: 'Yippie!',
    date: Date.now(),
    own: false,
  },
]

class OtherUsersDeck extends Component {

  constructor(props) {
    super(props);
    this.fetchOtherUsers();
    this.rendered = 0;
    console.log('these are props', this.props);
  }

  // handleMessages = (messages) => {
  //   this.setState({messages:messages});
  //   console.log('msgs HERE', messages);
  // }

  fetchOtherUsers() {
    const eventId = this.props.computedMatch.params.eventId;
    getOtherUsers(eventId)
    .then(data => data.json())
    .then(data => {
      console.error(data);
      return data.filter(el => el.email !== this.props.authObj.email)
    })
    .then(data => this.props.addOtherUsers(data))
  }

  roomData () {
    return {
      ourId: this.props.authObj.id,
      theirId: this.props.otherUsers[0].id,
      eventId: this.props.computedMatch.params.eventId,
    }
  }

  sendMessage = (msg) => {
    this.props.sendMessage(this.roomData(),  msg);
    // console.log('sendmsg', msg);
  }


  cardThrown = async (e) => {
    if(e.throwDirection === Direction.RIGHT){
      const eventId = this.props.computedMatch.params.eventId;
      this.props.socketConnect(this.roomData());
      // this.props.getMessage(data);
      const data = {
        eventId: eventId,
        emails: {
          currentUser: this.props.authObj,
          otherUser: {email:e.target.id, name:e.target.key}
        }
      }

      // FIXME: make it work and uncomment
      // const invite = await sendInvite(data);
      // console.log('this is an invite',invite);
      // if (invite === 'email sent') {
      //   console.log('an email has been sent to the other user');
      // }
    }
  }

  render() {
    console.log(this.props, 'here');
    this.rendered++
    const data = this.props.otherUsers;
    return (
        <div>
          <Swing
            className="stack"
            tagName="div"
            setStack={(stack)=> this.setState({stack:stack})}
            ref="stack"
            throwout={this.rendered === 1 ? this.cardThrown : null}
          >
            {data.map(item =>
              <div id={item.email} key={item.name} className="Card">
                <img draggable={false} src={item.img} className="CardImage" alt="profile-pic"/>
                <h2>{item.name}</h2>
              </div>
            )}
          </Swing>
        <Chat
          messages={this.props.messages}
          message={this.handleMessages}
          sendMessage={this.sendMessage}
          getMessage={this.getMessage}
          roomData={this.roomData}
         />
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authObj: state.auth.authObj,
  otherUsers: state.entities.otherUsers,
  date: state.entities.date,
  messages: state.entities.messages
})

const mapDispatchToProps = (dispatch) => ({
  addOtherUsers: (eventId) => dispatch(addOtherUsers(eventId)),
  sendMessage: (room, msg) => dispatch(sendMessage(room, msg)),
  socketConnect: (data) => dispatch(socketConnect(data)),
  getMessage:(data) => dispatch(getMessage(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherUsersDeck);
