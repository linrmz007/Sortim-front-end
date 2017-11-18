import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAuth } from '../actions';
import { login } from '../Service';

import FacebookLogin from 'react-facebook-login';

class Login extends Component {

  responseFacebook = (response) => {
    console.log('response', response);
    this.props.onFbLogin(response);
    login(response);
  }

  render() {
    return (
      <div className="Login">
      <div className="LoginText">
        <h2 className="Welcome">Welcome to <span>Sortim</span>!</h2>
        <h3 className="Welcome">Login to connect with people at Facebook events...</h3>
      </div>
        <FacebookLogin
          appId="1653318524689223"
          autoLoad={false}
          fields="name,email,picture.type(large)"
          scope="public_profile,email,user_events"
          callback={this.responseFacebook}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authObj: state.auth.authObj
})

const mapDispatchToProps = (dispatch) => ({
  onFbLogin: (data) => dispatch(addAuth(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
