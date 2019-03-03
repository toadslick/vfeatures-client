import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import renderReleasesSelect from '../../utils/render-releases-select';
import RequestResult from '../request-result';
import RequestForm from '../request-form';
import DeleteButton from '../delete-button';

class SiloDetail extends Component {

  renderResult([{ id, key, release }, releases]) {
    const { sendSiloRequest } = this.props;

    return (
      <Fragment>
        <h2>
          <Link to='/silos'>
            Silos
          </Link> / { key }
        </h2>
        <p>
          <Link to={ '/releases/' + release.id }>
            { release.key }
          </Link>
        </p>
        <RequestForm
          url={ '/silos/' + id }
          method='PUT'
          transform={ state => ({ silo: { ...state }}) }
          onFulfilled={ sendSiloRequest }
          values={{ key, release_id: release.id }}
          revealButtonContent='Edit'
        >
          { field => (
            <label>
              <span>Key</span>
              { field(<input
                type='text'
                name='key'
                placeholder='Key'
                autoComplete='off'
              />) }
              { field(renderReleasesSelect(releases)) }
            </label>
          )}
        </RequestForm>
        <DeleteButton
          requestURL={ '/silos/' + id }
          redirectURL='/silos'
          value={ key }
        >
          Delete
        </DeleteButton>
      </Fragment>
    );
  }

  render() {
    const { siloRequest, releasesRequest } = this.props;
    return (
      <RequestResult requests={ [siloRequest, releasesRequest] }>
        { this.renderResult.bind(this) }
      </RequestResult>
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  siloRequest: '/silos/' + id,
  releasesRequest: '/releases',
  sendSiloRequest: () => ({
    siloRequest: {
      url: '/silos/' + id,
      refreshing: true,
      force: true,
    },
  }),
}))(SiloDetail);
