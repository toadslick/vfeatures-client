import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import mapBy from '../../utils/map-by-property';
import RequestResult from '../request-result';
import RequestForm from '../request-form';
import DeleteButton from '../delete-button';
import ChangesForRecord from '../changes-for-record';
import Table from '../table';

class ReleaseDetail extends Component {

  renderList(flags, featuresMap) {
    return (
      <Table
        items={ flags }
        columns={{
          feature: ({ feature_id }) => (
            <Link to={ `/features/${feature_id}` }>
              { featuresMap[feature_id].key }
            </Link>
          ),
          enabled: (({ id, enabled }) => (
            <Link to={ '/flags/' + id }>
              { enabled ? 'enabled' : 'disabled' }
            </Link>
          )),
        }}
      />
    );
  }

  renderResult([release, featuresMap]) {
    const { id, key, flags } = release;
    const { sendReleaseRequest } = this.props;

    return (
      <Fragment>
        <h1>
          <Link to='/releases'>
            Releases
          </Link>
          <span> / </span>
          { key }
        </h1>
        { this.renderList(flags, featuresMap) }
        <RequestForm
          url={ '/releases/' + id }
          method='PUT'
          transform={ state => ({ release: { ...state }}) }
          onFulfilled={ sendReleaseRequest }
          values={{ key }}
          revealButtonContent='Edit...'
          legend='Edit Release'
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
          requestURL={ '/releases/' + id }
          redirectURL='/releases'
          value={ key }
          legend='Delete Release'
        >
          Delete...
        </DeleteButton>
        <ChangesForRecord type='Release' id={ id } record={ release }/>
      </Fragment>
    );
  }

  render() {
    const { releaseRequest, featuresRequest } = this.props;
    return (
      <RequestResult requests={ [releaseRequest, featuresRequest] }>
        { this.renderResult.bind(this) }
      </RequestResult>
    );
  }
}

export default connect(({ match: { params: { id }}}) => ({
  releaseRequest: '/releases/' + id,
  featuresRequest: {
    url: `/features`,
    then: features => ({ value: mapBy('id', features) }),
  },
  sendReleaseRequest: () => ({
    releaseRequest: {
      url: '/releases/' + id,
      refreshing: true,
      force: true,
    },
  }),
}))(ReleaseDetail);
