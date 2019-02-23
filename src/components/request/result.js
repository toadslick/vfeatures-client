import React, { Component } from 'react';
import { PromiseState } from 'react-refetch';

import RequestError from './error';
import RequestProgress from './progress';

class RequestResult extends Component {

  render() {
    const { requests, children, renderProgress, renderRejected } = this.props;
    const { pending, rejected, fulfilled, value } = PromiseState.all(requests);
    if (pending) { return renderProgress(); }
    if (rejected) { return renderRejected(); }
    if (fulfilled) { return children(value); }
  }
}

RequestResult.defaultProps = {
  requests: [],
  renderProgress: () => <RequestProgress/>,
  renderRejected: () => <RequestError/>,
  renderResults: () => null,
};

export default RequestResult;
