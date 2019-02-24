import { Container } from 'unstated';

// This Unstated Container stores the state of the currently logged-in user.
// The `token` is the value of the JWT bearer token that is used in
// `Authorization` headers of authenticated requests.
//
// TODO: uses cookies instead of localStorage so that the JWT token expires
// on the client side at the same time that it expires on the server side.
// This prevents a user from appearing to be logged in when their JWT session
// has already expired on the server.

export default class Session extends Container {
  state = {
    username: null, // localStorage.getItem('username'),
    token: null, // localStorage.getItem('token'),
  };

  login(username, token) {
    this.setState({ username, token });
    // localStorage.setItem('username', username);
    // localStorage.setItem('token', token);
  }

  logout() {
    this.setState({
      username: null,
      token: null,
    });
    // localStorage.removeItem('username');
    // localStorage.removeItem('token');
  }

  authorized() {
    const { username, token } = this.state;
    return username && token;
  }
}
