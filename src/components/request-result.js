import React, { Component } from 'react';
import { PromiseState } from 'react-refetch';

import RequestError from './request-error';
import RequestProgress from './request-progress';

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
