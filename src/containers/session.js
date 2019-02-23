import { Container } from 'unstated';

import config from '../config';

export default class Session extends Container {
  state = {
    username: null,
    token: null,
  };

  login(username, token) {
    this.setState({ username, token });
  }

  logout() {
    this.setState({
      username: null,
      token: null,
    });
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
        this.setState({ username, token });
      });
    });
  }

  isLoggedIn() {
    const { username, token } = this.state;
    return username && token;
  }
}
