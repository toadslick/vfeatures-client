import React, { Component } from 'react';
import { connect } from 'react-refetch';

import config from '../config';
import SessionGuard from './session-guard';

class LoginForm extends Component {
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
    const { attempt } = this.props;
    const { username, password } = this.state;
    attempt(username, password, session);
  }

  logout(session, e) {
    e.preventDefault();
    session.logout();
    this.setState({
      username: '',
      password: '',
    });
  }

  renderWhenLoggedIn(session) {
    const { username } = session.state;
    return (
      <div>
        <p>{ username }</p>
        <button
          type='button'
          onClick={ this.logout.bind(this, session) }
        >
          Log Out
        </button>
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

export default connect(() => ({
  attempt: (username, password, session) => ({
    request: {
      url: `${config.apiRoot}/login`,
      method: 'POST',
      body: JSON.stringify({ user: { username, password }}),
      force: true,

      // By default, only the body of the response is exposed by React Refetch.
      // Overwrite the `handleResponse` function so that the authorization header
      // can be retrieved and stored.
      handleResponse: response => {
        const { headers, status } = response;
        const json = response.json();

        if (headers.get('content-length') === '0' || status === 204) { return; }

        if (status === 200) {
          const token = response.headers.get('authorization');
          json.then((body) => {
            session.login(body.username, token);
            return Promise.resolve(body);
          });
        } else {
          return json.then(({ error }) => Promise.reject(error));
        }
      },
    },
  }),
}))(LoginForm);
