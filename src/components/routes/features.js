import React, { Component } from 'react';
import { connect } from 'react-refetch';

import config from '../../config';
import RequestError from '../request-error';
import RequestProgress from '../request-progress';

class Features extends Component {
  render () {
    const { request: { pending, rejected, fulfilled, value }} = this.props;

    if (pending) {
      return (<RequestProgress/>);
    } else if (rejected) {
      return (<RequestError/>);
    } else if (fulfilled) {
      return (
        <ul>
          { value.map(feature => (<li key={ feature.key.id }>{ feature.key }</li>)) }
        </ul>
      );
    }
  }
}

export default connect(props => ({
  request: `${config.apiRoot}/features`,
}))(Features);
