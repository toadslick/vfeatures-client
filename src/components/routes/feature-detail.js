import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import config from '../../config';
import RequestResult from '../request-result';
import mapByID from '../../utils/map-by-id';

class FeatureDetail extends Component {

  renderResult([{ id, key, flags }, releasesMap]) {
    const listItems = flags.map(({ id, enabled, release_id }) => {
      const { key } = releasesMap[release_id];
      return (
        <li key={ key }>
          { key }: {
          <Link to={ '/flags/' + id }>
            { enabled ? 'enabled' : 'disabled' }
          </Link> }
        </li>
      );
    });
    return (
      <main>
        <h2>
          <Link to='/features'>
            Features
          </Link>
          : { key }
        </h2>
        <ul>{ listItems }</ul>
      </main>
    );
  }

  render() {
    const { featureRequest, releasesRequest } = this.props;
    return (
      <RequestResult requests={ [featureRequest, releasesRequest] }>
        { this.renderResult.bind(this) }
      </RequestResult>
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  featureRequest: `${config.apiRoot}/features/${ id }`,
  releasesRequest: {
    url: `${config.apiRoot}/releases`,
    then: releases => ({ value: mapByID(releases) }),
  },
}))(FeatureDetail);
