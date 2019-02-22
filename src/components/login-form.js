import React, { Component } from 'react';
import SessionGuard from './session-guard';

export default class LoginForm extends Component {

  login(e) {
    e.preventDefault();
    console.log('LOG IN');
  }

  logout(e) {
    e.preventDefault();
    console.log('LOG OUT');
  }

  renderWhenLoggedIn(session) {
    const { username } = session.state;
    return (
      <div>
        <p>{ username }</p>
        <button
          type='button'
          onClick={ this.logout.bind(this) }
        >Log Out</button>
      </div>
    );
  }

  renderWhenLoggedOut() {
    return (
      <form onSubmit={ this.login.bind(this) }>
        <label htmlFor='login-username-input'>Username</label>
        <input id='#login-username-input' name='username'/>
        <label htmlFor='login-password-input'>Password</label>
        <input id='#login-password-input' name='password' type='password'/>
        <button>Log In</button>
      </form>
    );
  }

  render() {
    return (
      <SessionGuard
        renderWhenLoggedIn={ this.renderWhenLoggedIn.bind(this) }
        renderWhenLoggedOut={ this.renderWhenLoggedOut.bind(this) }
      />
    );
  }
}
