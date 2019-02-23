import React, { Component } from 'react';
import { connect } from 'react-refetch';

import config from '../config';
import session from './connect-session';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  input(propName, e) {
    const { target: { value }} = e;
    this.setState({
      [propName]: value,
    });
  }

  login(e) {
    e.preventDefault();
    const { attempt } = this.props;
    attempt(this.state);
  }

  logout(e) {
    e.preventDefault();
    const { session } = this.props;
    session.logout();
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    const { session } = this.props;

    if (session.authorized()) {
      return (
        <div>
          <p>{ session.state.username }</p>
          <button
            type='button'
            onClick={ this.logout.bind(this) }
          >
            Log Out
          </button>
        </div>
      );
    } else {
      return (
        <form onSubmit={ this.login.bind(this) }>
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
  }
}

export default session(connect(({ session }) => ({
  attempt: ({ username, password }) => ({
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
}))(LoginForm));
