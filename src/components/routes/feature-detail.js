import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import mapBy from '../../utils/map-by-property';
import RequestResult from '../request-result';
import RequestForm from '../request-form';
import DeleteButton from '../delete-button';
import ChangesForRecord from '../changes-for-record';
import Table from '../table';
import FlagStatus from '../flag-status';

class FeatureDetail extends Component {

  renderList(flags, releasesMap) {
    return (
      <Table
        items={ flags }
        columns={{
          release: ({ release_id }) => (
            <Link to={ `/releases/${release_id}` }>
              { releasesMap[release_id].key }
            </Link>
          ),
          flag: (flag => <FlagStatus flag={ flag }/>),
        }}
      />
    );
  }

  renderResult([feature, releasesMap]) {
    const { id, key, flags } = feature;
    const { sendFeatureRequest } = this.props;

    return (
      <Fragment>
        <h1>
          <Link to='/features'>
            Features
          </Link>
          <span> / </span>
          { key }
        </h1>
        { this.renderList(flags, releasesMap) }
        <RequestForm
          url={ '/features/' + id }
          method='PUT'
          transform={ state => ({ feature: { ...state }}) }
          onFulfilled={ sendFeatureRequest }
          values={{ key }}
          revealButtonContent='Edit...'
          legend='Edit Feature'
        >
          { (field, focusRef) => (
            <label>
              <span>Key</span>
              { field(<input
                type='text'
                name='key'
                placeholder='Key'
                autoComplete='off'
                ref={ focusRef }
              />) }
            </label>
          )}
        </RequestForm>
        <DeleteButton
          requestURL={ '/features/' + id }
          redirectURL='/features'
          value={ key }
          legend='Delete Feature'
        >
          Delete...
        </DeleteButton>
        <ChangesForRecord type='Feature' id={ id } record={ feature }/>
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
