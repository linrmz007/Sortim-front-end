import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvents } from '../actions';
import Event from '../components/Event.js';
import { saveEvents } from '../Service';
import AlertContainer from 'react-alert';
import { logOut } from '../actions';


class EventList extends Component {
  constructor (props) {
    super(props)
    this.fetchEvents()
  }

  //fix it on the server side
  // check time when events expire
  // subscribe and
  //when catchig
  //redirect to login pg or popup bring the log out button again
 // use toaster to send a nicer msg && redirect to login
  fetchEvents() {

      fetch(`https://graph.facebook.com/v2.10/me/events?fields=start_time,end_time,id,name,picture.type(large)&access_token=${this.props.authObj.accessToken}`)
      .then(events => events.json())
      .then(events => {
        console.log('events :', events)
        console.log('data', events.data)
        const allEvents = events.data && events.data.filter(event => (
          Date.parse(event.start_time) >= Date.now()
        ))
        if (!Array.isArray(allEvents)) {
          return this.props.logOut()
        }
        allEvents.sort((a,b) => {
          return Date.parse(a.start_time) - Date.parse(b.start_time)
        })
        this.props.onEvents(allEvents);
        console.log('all Events', allEvents);
          const eventIds = allEvents.map(event => allEvents.id)
          const data = {
            userId: this.props.authObj.id,
            events: eventIds
          }
        saveEvents(data);
      })
  }

  render() {
    if(!this.props.events) return null;
    const events = Object.keys(this.props.events)
      .map(eventId => {
        return <Event key={eventId} event={this.props.events[eventId]} />
      });
    return (
      <div className="EventList">
        {events}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authObj: state.auth.authObj,
  events: state.entities.events
})

const mapDispatchToProps = (dispatch) => ({
  onEvents: (events) => dispatch(addEvents(events)),
  logOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
