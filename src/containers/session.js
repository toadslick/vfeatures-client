import { Container } from 'unstated';

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

  isLoggedIn() {
    const { username, token } = this.state;
    return username && token;
  }
}
