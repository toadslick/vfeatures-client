import React from 'react';
import { connect } from 'react-refetch';

import config from '../../config';
import Request from '../request/request';

class SilosList extends Request {
  renderFulfilled([ value ]) {
    const listItems = value.map(({ key }) =>
      <li key={ key }>{ key }</li>
    );
    return (
      <div>
        <h2>Silos</h2>
        <ul>{ listItems }</ul>
      </div>
    );
  }
}

export default connect(() => ({
  request: `${config.apiRoot}/silos`,
}))(SilosList);
