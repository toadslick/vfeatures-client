import { Container } from 'unstated';

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

  isLoggedIn() {
    const { username, token } = this.state;
    return username && token;
  }
}
