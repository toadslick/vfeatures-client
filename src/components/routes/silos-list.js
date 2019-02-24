import React, { Component } from 'react';
import { connect } from 'react-refetch';

import config from '../../config';
import mapByID from '../../utils/map-by-id';
import RequestResult from '../request/result';

class SilosList extends Component {

  renderResult([ silos, releasesMap ]) {
    const listItems = silos.map(({ key, release_id }) =>
      <li key={ key }>
        { key }: { releasesMap[release_id].key }
      </li>
    );
    return <ul>{ listItems }</ul>;
  }

  render() {
    const { silosRequest, releasesRequest } = this.props;
    return (
      <div>
        <h2>Silos</h2>
        <RequestResult requests={ [silosRequest, releasesRequest] }>
          { this.renderResult.bind(this) }
        </RequestResult>
      </div>
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
