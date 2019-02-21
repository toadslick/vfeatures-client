import React from 'react';
import { connect } from 'react-refetch';

import config from '../../config';
import Request from '../request/request';

class FeatureRequest extends Request {
  renderFulfilled([{ id, key, flags }]) {
    const listItems = flags.map(({ id, enabled, release_id }) =>
      <li key={ key }>
        { release_id }: { enabled ? 'on' : 'off' }
      </li>
    );
    return (
      <div>
        <h2>Features: { key }</h2>
        <ul>{ listItems }</ul>
      </div>
    );
  }
}

export default connect(({ match }) => ({
  request: `${config.apiRoot}/features/${ match.params.id }`,
}))(FeatureRequest);
