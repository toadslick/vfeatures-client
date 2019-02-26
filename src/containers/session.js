import { Container } from 'unstated';
import * as Cookie from 'js-cookie';

import { sessionDurationInDays } from '../utils/config';

const cookieKey = 'session';
const cookieOptions = { expires: sessionDurationInDays };

// This Unstated Container stores the state of the currently logged-in user.
// The `token` is the value of the JWT bearer token that is used in
// `Authorization` headers of authenticated requests.

export default class Session extends Container {
  constructor() {
    super();
    const { username, token } = Cookie.getJSON(cookieKey) || {};
    this.state = { username, token };
  }

  login(username, token) {
    this.setState({ username, token });
    Cookie.set(cookieKey, { username, token }, cookieOptions);
  }

  logout() {
    this.setState({
      username: null,
      token: null,
    });
    Cookie.remove(cookieKey);
  }

  authorized() {
    const { username, token } = this.state;
    return username && token;
  }
}
