import React, { Component } from 'react';

import RequestError from './error';
import RequestProgress from './progress';

function NotImplementedException(message) {
   this.message = "Components inheriting from Request must implement renderFulfilled()";
   this.name = 'NotImplementedException';
}

export default class Request extends Component {

  renderProgress() {
    return <RequestProgress/>;
  }

  renderRejected() {
    return <RequestError/>;
  }

  renderFulfilled() {
    throw new NotImplementedException();
  }

  render() {
    const { request: { pending, rejected, fulfilled, value }} = this.props;

    if (pending) { return this.renderProgress(); }
    if (rejected) { return this.renderRejected(); }
    if (fulfilled) { return this.renderFulfilled(value); }
  }
}
