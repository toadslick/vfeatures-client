import { Container } from 'unstated';

// This Unstated Container stores the state of the currently logged-in user.
// The `token` is the value of the JWT bearer token that is used in
// `Authorization` headers of authenticated requests.
//
// The state is also preserved in localStorage so that a logged-in user is
// maintained across browser sessions.
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

  authorized() {
    const { username, token } = this.state;
    return username && token;
  }
}
