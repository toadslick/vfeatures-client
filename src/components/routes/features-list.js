import React from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import config from '../../config';
import Request from '../request/request';

class FeaturesList extends Request {
  renderFulfilled([ value ]) {
    const listItems = value.map(({ id, key }) =>
      <li key={ key }>
        <Link to={ `/features/${id}` }>
          { key }
        </Link>
      </li>
    );
    return (
      <div>
        <h2>Features</h2>
        <ul>{ listItems }</ul>
      </div>
    );
  }
}

export default connect(() => ({
  request: `${config.apiRoot}/features`,
}))(FeaturesList);
