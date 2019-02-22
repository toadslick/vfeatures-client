import React, { Component } from 'react';
import { PromiseState } from 'react-refetch';

import RequestError from './error';
import RequestProgress from './progress';

class RequestWrapper extends Component {

  render() {
    const { requests, renderResults, renderProgress, renderRejected } = this.props;
    const { pending, rejected, fulfilled, value } = PromiseState.all(requests);
    if (pending) { return renderProgress(); }
    if (rejected) { return renderRejected(); }
    if (fulfilled) { return renderResults(value); }
  }
}

RequestWrapper.defaultProps = {
  requests: [],
  renderProgress: () => <RequestProgress/>,
  renderRejected: () => <RequestError/>,
  renderResults: () => null,
};

export default RequestWrapper;
