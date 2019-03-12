import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import RequestResult from '../request-result';
import RequestForm from '../request-form';
import Table from '../table';

class ReleasesList extends Component {

  renderResult([ releases ]) {
    return (
      <Table
        items={ releases }
        columns={{
          key: ({ id, key }) => (
            <Link to={ `/releases/${id}` }>
              { key }
            </Link>
          ),
        }}
      />
    );
  }

  render() {
    const { request, sendRequest } = this.props;
    return (
      <Fragment>
        <h1>Releases</h1>
        <RequestResult requests={ [request] }>
          { this.renderResult.bind(this) }
        </RequestResult>
        <RequestForm
          url='/releases'
          transform={ state => ({ release: { ...state }}) }
          onFulfilled={ sendRequest }
          values={{ key: '' }}
          revealButtonContent='Create...'
          legend='Create Release'
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
      </Fragment>
    );
  }
}

export default connect(() => ({
  request: '/releases',
  sendRequest: () => ({
    request: {
      url: '/releases',
      refreshing: true,
      force: true,
    }
  })
}))(ReleasesList);
