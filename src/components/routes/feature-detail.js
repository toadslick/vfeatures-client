import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import config from '../../config';
import RequestWrapper from '../request/wrapper';
import mapByID from '../../utils/map-by-id';

class FeatureDetail extends Component {

  renderResults([{ id, key, flags }, releases]) {
    const releasesMap = mapByID(releases);
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
      <div>
        <h2>Features: { key }</h2>
        <ul>{ listItems }</ul>
      </div>
    );
  }

  render() {
    const { featureRequest, releasesRequest } = this.props;
    return (
      <RequestWrapper
        requests={ [featureRequest, releasesRequest] }
        renderResults= { this.renderResults.bind(this) }
      />
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  featureRequest: `${config.apiRoot}/features/${ id }`,
  releasesRequest: `${config.apiRoot}/releases`,
}))(FeatureDetail);
