import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import RequestResult from '../request-result';

class SiloDetail extends Component {

  renderResult([{ id, key, release }]) {
    return (
      <main>
        <h2>
          <Link to='/silos'>
            Silos
          </Link>
          : { key }
        </h2>
        <p>{ release.key }</p>
      </main>
    );
  }

  render() {
    const { request } = this.props;
    return (
      <RequestResult requests={ [request] }>
        { this.renderResult.bind(this) }
      </RequestResult>
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  request: `silos/${ id }`,
}))(SiloDetail);
