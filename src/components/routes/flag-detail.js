import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import config from '../../config';
import RequestWrapper from '../request/wrapper';

class FlagDetail extends Component {

  renderResults([{ id, enabled, feature, release }]) {
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

  render() {
    const { request } = this.props;
    return (
      <RequestWrapper
        requests= { [request] }
        renderResults={ this.renderResults.bind(this) }
      />
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  request: `${config.apiRoot}/flags/${id}`,
}))(FlagDetail);
