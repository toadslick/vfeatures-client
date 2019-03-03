import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import RequestResult from '../request-result';
import DeleteButton from '../delete-button';

class SiloDetail extends Component {

  renderResult([{ id, key, release }]) {
    return (
      <Fragment>
        <h2>
          <Link to='/silos'>
            Silos
          </Link> / { key }
        </h2>
        <p>
          <Link to={ `/releases/${ release.id }` }>
            { release.key }
          </Link>
        </p>
        <DeleteButton
          requestURL={ `/silos/${ id }` }
          redirectURL='/silos'
          value={ key }
        >
          Delete { key }
        </DeleteButton>
      </Fragment>
    );
  }

  render() {
    const { request } = this.props;
    return (
      <RequestResult requests={ [request] }>
        { this.renderResult.bind(this) }
      </RequestResult>
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  request: `/silos/${ id }`,
}))(SiloDetail);
