import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import mapBy from '../../utils/map-by-property';
import RequestResult from '../request-result';
import RequestForm from '../request-form';
import DeleteButton from '../delete-button';

class ReleaseDetail extends Component {

  renderList(flags, featuresMap) {
    const listItems = flags.map(({ id, enabled, feature_id }) => {
      const { key } = featuresMap[feature_id];
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

  renderResult([{ id, key, flags }, featuresMap]) {
    const { sendReleaseRequest } = this.props;

    return (
      <main>
        <h2>
          <Link to='/releases'>
            Releases
          </Link> / { key }
        </h2>
        { this.renderList(flags, featuresMap) }
        <RequestForm
          url={ '/releases/' + id }
          method='PUT'
          transform={ state => ({ release: { ...state }}) }
          onFulfilled={ sendReleaseRequest }
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
          requestURL={ '/releases/' + id }
          redirectURL='/releases'
          value={ key }
        >
          Delete
        </DeleteButton>
      </main>
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
