import React, { Component } from 'react'
import AlertContainer from 'react-alert'



export default class LoginAlert extends Component {

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }

  showAlert = () => {
    this.msg.show('Your Access Token has expired. Please Log-In again.', {
      time: 2000,
      type: 'error',
      icon: <img src="path/to/some/img/32x32.png" alt='Access token expired alert.'/>
    })
  }

  render () {
    return (
      <div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <button onClick={this.showAlert}>Show Alert</button>
        {
          this.msg.show('Access Token Expired');
        }
      </div>
    )
  }
}
