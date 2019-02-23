import React, { Component } from 'react';

import SessionGuard from './session-guard';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  input(propName, e) {
    const { target: { value }} = e;
    this.setState({
      [propName]: value,
    });
  }

  login(session, e) {
    e.preventDefault();
    session.loginAttempt(this.state);
  }

  logout(session, e) {
    e.preventDefault();
    session.logout();
  }

  renderWhenLoggedIn(session) {
    const { username } = session.state;
    return (
      <div>
        <p>{ username }</p>
        <button
          type='button'
          onClick={ this.logout.bind(this, session) }
        >Log Out</button>
      </div>
    );
  }

  renderWhenLoggedOut(session) {
    return (
      <form onSubmit={ this.login.bind(this, session) }>
        <label>
          <span>Username</span>
          <input
            type='text'
            onChange={ this.input.bind(this, 'username') }
            placeholder='Username'
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type='password'
            onChange={ this.input.bind(this, 'password') }
            placeholder='Password'
          />
        </label>
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
