import React, { Component } from 'react';
import Swing from 'react-swing';
import { Direction } from 'swing';
import { connect } from 'react-redux';
import { addOtherUsers } from '../actions';
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

  }

  // componentDidMount() {
  //   ReactDOM.findDOMNode(this).addEventListener('handle', this.handleMessages);
  //   ReactDOM.findDOMNode(this).addEventListener('message', this.handleMessages);
  // }

  handleMessages = (messages) => {
    this.setState({messages:messages});
    console.log('msgs', messages);
  }

  sendMsg = (message) => {
    //dispatch with sockets
    console.log('sendmsg', message);
  }


  fetchOtherUsers() {
    const eventId = this.props.computedMatch.params.eventId;
    getOtherUsers(eventId)
    .then(data => data.json())
    .then(data => {
      return data.filter(el => el.email !== this.props.authObj.email)
    })
    .then(data => this.props.addOtherUsers(data))
  }

  cardThrown = async (e) => {
    if(e.throwDirection === Direction.RIGHT){
      const eventId = this.props.computedMatch.params.eventId;
      console.log(eventId);
      const data = {
        eventId: eventId,
        emails: {
          currentUser: this.props.authObj,
          otherUser: {email:e.target.id, name:e.target.key}
        }
      }
      const invite = await sendInvite(data);
      console.log(invite);
      if (invite === 'email sent') {
        console.log('an email has been sent to the other user');
      }
    }
  }


  render() {
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
        
          onSendMsg={this.sendMsg}
          messages={mockData}
         />
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authObj: state.auth.authObj,
  otherUsers: state.entities.otherUsers,
})

const mapDispatchToProps = (dispatch) => ({
  addOtherUsers: (eventId) => dispatch(addOtherUsers(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherUsersDeck);
