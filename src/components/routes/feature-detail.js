import React from 'react';
import { connect } from 'react-refetch';

import config from '../../config';
import Request from '../request/request';
import mapByID from '../../utils/map-by-id';

class FeatureDetail extends Request {
  requests() {
    const { featureRequest, releasesRequest } = this.props;
    return [featureRequest, releasesRequest];
  }

  renderFulfilled([{ id, key, flags }, releases]) {
    const releasesMap = mapByID(releases);

    const listItems = flags.map(({ id, enabled, release_id }) => {
      const { key } = releasesMap[release_id];
      return (
        <li key={ key }>
          { key }: { enabled ? 'on' : 'off' }
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
}

export default connect(({ match }) => ({
  featureRequest: `${config.apiRoot}/features/${ match.params.id }`,
  releasesRequest: `${config.apiRoot}/releases`,
}))(FeatureDetail);
