import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import config from '../../config';
import RequestResult from '../request/result';
import mapByID from '../../utils/map-by-id';

class ReleaseDetail extends Component {

  renderResult([{ id, key, flags }, featuresMap]) {
    const listItems = flags.map(({ id, enabled, feature_id }) => {
      const { key } = featuresMap[feature_id];
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
          <Link to='/releases'>
            Releases
          </Link>
          : { key }
        </h2>
        <ul>{ listItems }</ul>
      </main>
    );
  }

  render() {
    const { releaseRequest, featuresRequest } = this.props;
    return (
      <RequestResult requests={ [releaseRequest, featuresRequest] }>
        { this.renderResult.bind(this) }
      </RequestResult>
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  releaseRequest: `${config.apiRoot}/releases/${ id }`,
  featuresRequest: {
    url: `${config.apiRoot}/features`,
    then: features => ({ value: mapByID(features) }),
  },
}))(ReleaseDetail);
