import React, { Component } from 'react';
import { PromiseState } from 'react-refetch';

import RequestError from './error';
import RequestProgress from './progress';

function NotImplementedException(message) {
   this.message = "Components inheriting from Request must implement renderFulfilled()";
   this.name = 'NotImplementedException';
}

export default class Request extends Component {

  requests() {
    const { request } = this.props;
    return [request];
  }

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
    const { pending, rejected, fulfilled, value } = PromiseState.all(this.requests());

    if (pending) { return this.renderProgress(); }
    if (rejected) { return this.renderRejected(); }
    if (fulfilled) { return this.renderFulfilled(value); }
  }
}
