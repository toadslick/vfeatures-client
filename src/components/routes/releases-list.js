import React, { Component } from 'react';
import { connect } from 'react-refetch';

import config from '../../config';
import RequestWrapper from '../request/wrapper';

class ReleasesList extends Component {

  renderResults([ value ]) {
    const listItems = value.map(({ key }) =>
      <li key={ key }>{ key }</li>
    );
    return <ul>{ listItems }</ul>;
  }

  render() {
    const { request } = this.props;
    return (
      <div>
        <h2>Releases</h2>
        <RequestWrapper
          requests={ [request] }
          renderResults={ this.renderResults.bind(this) }
        />
      </div>
    );
  }
}

export default connect(() => ({
  request: `${config.apiRoot}/releases`,
}))(ReleasesList);
