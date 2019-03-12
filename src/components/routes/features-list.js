import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import RequestResult from '../request-result';
import RequestForm from '../request-form';
import Table from '../table';

class FeaturesList extends Component {

  renderResult([ features ]) {
    return (
      <Table
        items={ features }
        columns={{
          key: ({ id, key }) => (
            <Link to={ `/features/${id}` }>
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
        <h1>Features</h1>
        <RequestResult requests={ [request] }>
          { this.renderResult.bind(this) }
        </RequestResult>
        <RequestForm
          url='/features'
          transform={ state => ({ feature: { ...state }}) }
          onFulfilled={ sendRequest }
          values={{ key: '' }}
          revealButtonContent='Create...'
          legend='Create Feature'
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
  request: `/features`,
  sendRequest: () => ({
    request: {
      url: '/features',
      refreshing: true,
      force: true,
    },
  }),
}))(FeaturesList);
