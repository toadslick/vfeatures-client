import React, { Component } from 'react';
import { connect } from 'react-refetch';

import config from '../../config';
import RequestResult from '../request/result';

class SilosList extends Component {

  renderResult([ value ]) {
    const listItems = value.map(({ key }) =>
      <li key={ key }>{ key }</li>
    );
    return <ul>{ listItems }</ul>;
  }

  render() {
    const { request } = this.props;
    return (
      <div>
        <h2>Silos</h2>
        <RequestResult requests={ [request] }>
          { this.renderResult.bind(this) }
        </RequestResult>
      </div>
    );
  }
}

export default connect(() => ({
  request: `${config.apiRoot}/silos`,
}))(SilosList);
