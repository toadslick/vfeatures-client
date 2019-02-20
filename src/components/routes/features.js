import React from 'react';
import { connect } from 'react-refetch';

import config from '../../config';
import Request from '../request/request';

class FeaturesRequest extends Request {
  renderFulfilled(value) {
    const listItems = value.map(({ key }) =>
      <li key={ key }>{ key }</li>
    );
    return <ul>{ listItems }</ul>;
  }
}

export default connect(props => ({
  request: `${config.apiRoot}/features`,
}))(FeaturesRequest);
