import { Container } from 'unstated';

import config from '../config';

export default class Session extends Container {
  state = {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
  };

  login(username, token) {
    this.setState({ username, token });
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  }

  logout() {
    this.setState({
      username: null,
      token: null,
    });
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  loginAttempt({ username, password }) {
    fetch(`${config.apiRoot}/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { username, password }}),
      mode: 'cors',
    }).then((response) => {
      const token = response.headers.get('authorization');
      return response.json().then(({ username }) => {
        this.login(username, token);
      });
    });
  }

  isLoggedIn() {
    const { username, token } = this.state;
    return username && token;
  }
}
