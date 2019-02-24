import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import config from '../../config';
import mapByID from '../../utils/map-by-id';
import RequestResult from '../request-result';

class SilosList extends Component {

  renderResult([ silos, releasesMap ]) {
    const listItems = silos.map(({ id, key, release_id }) =>
      <li key={ key }>
        <Link to={ `/silos/${id}` }>
          { key }
        </Link>
        : { releasesMap[release_id].key }
      </li>
    );
    return <ul>{ listItems }</ul>;
  }

  render() {
    const { silosRequest, releasesRequest } = this.props;
    return (
      <main>
        <h2>Silos</h2>
        <RequestResult requests={ [silosRequest, releasesRequest] }>
          { this.renderResult.bind(this) }
        </RequestResult>
      </main>
    );
  }
}

export default connect(() => ({
  silosRequest: `${config.apiRoot}/silos`,
  releasesRequest: {
    url: `${config.apiRoot}/releases`,
    then: releases => ({ value: mapByID(releases) }),
  },
}))(SilosList);
