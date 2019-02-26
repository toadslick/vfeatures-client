import React, { Component, Fragment } from 'react';

import session from '../utils/unstated/session-connector';
import connect from '../utils/refetch/api-connector';
import handleLoginResponse from '../utils/refetch/handle-login-response';
import RequestFieldset from './request-fieldset';

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
    const { session, request } = this.props;

    if (session.authorized()) {
      return (
        <Fragment>
          <p>{ session.state.username }</p>
          <button
            type='button'
            onClick={ this.logout.bind(this) }
          >
            Log Out
          </button>
        </Fragment>
      );
    } else {
      return (
        <form onSubmit={ this.login.bind(this) }>
          <RequestFieldset requests={ [request] }>
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
          </RequestFieldset>
        </form>
      );
    }
  }
}

export default session(connect(({ session }) => ({
  attempt: ({ username, password }) => ({
    request: {
      url: `/login`,
      method: 'POST',
      body: JSON.stringify({ user: { username, password }}),
      force: true,
      handleResponse: handleLoginResponse(session),
    },
  }),
}))(LoginForm));
