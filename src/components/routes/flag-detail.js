import React from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import config from '../../config';
import Request from '../request/request';

class FlagDetail extends Request {
  renderFulfilled([{ id, enabled, feature, release }]) {
    return (
      <div>
        <h2>
          Flag for {
          <Link to={ '/features/' + feature.id }>
            { feature.key }
          </Link>
          } on {
          <Link to={ '/releases/' + release.id }>
            { release.key }
          </Link> }
        </h2>
        <p>
          { enabled ? 'enabled' : 'disabled' }
        </p>
        <button type='button'>
          { enabled ? 'disable flag' : 'enable flag' }
        </button>
      </div>
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  request: `${config.apiRoot}/flags/${id}`,
}))(FlagDetail);
