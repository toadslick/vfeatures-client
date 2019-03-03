import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import mapBy from '../../utils/map-by-property';
import RequestResult from '../request-result';
import RequestForm from '../request-form';
import DeleteButton from '../delete-button';

class FeatureDetail extends Component {

  renderList(flags, releasesMap) {
    const listItems = flags.map(({ id, enabled, release_id }) => {
      const { key } = releasesMap[release_id];
      return (
        <li key={ key }>
          { key }: {
          <Link to={ '/flags/' + id }>
            { enabled ? 'enabled' : 'disabled' }
          </Link> }
        </li>
      );
    });
    return <ul>{ listItems }</ul>;
  }

  renderResult([{ id, key, flags }, releasesMap]) {
    const { sendFeatureRequest } = this.props;

    return (
      <Fragment>
        <h2>
          <Link to='/features'>
            Features
          </Link> / { key }
        </h2>
        { this.renderList(flags, releasesMap) }
        <RequestForm
          url={ '/features/' + id }
          method='PUT'
          transform={ state => ({ feature: { ...state }}) }
          onFulfilled={ sendFeatureRequest }
          values={{ key }}
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
            </label>
          )}
        </RequestForm>
        <DeleteButton
          requestURL={ '/features/' + id }
          redirectURL='/features'
          value={ key }
        >
          Delete
        </DeleteButton>
      </Fragment>
    );
  }

  render() {
    const { featureRequest, releasesRequest } = this.props;
    return (
      <RequestResult requests={ [featureRequest, releasesRequest] }>
        { this.renderResult.bind(this) }
      </RequestResult>
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  featureRequest: '/features/' + id,
  releasesRequest: {
    url: `/releases`,
    then: releases => ({ value: mapBy('id', releases) }),
  },
  sendFeatureRequest: () => ({
    featureRequest: {
      url: '/features/' + id,
      refreshing: true,
      force: true,
    },
  }),
}))(FeatureDetail);
