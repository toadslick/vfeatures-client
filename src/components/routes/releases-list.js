import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import RequestResult from '../request-result';
import RequestForm from '../request-form';

class ReleasesList extends Component {

  renderResult([ value ]) {
    const listItems = value.map(({ id, key }) =>
      <li key={ key }>
        <Link to={ `/releases/${id}` }>
          { key }
        </Link>
      </li>
    );
    return <ul>{ listItems }</ul>;
  }

  render() {
    const { request, sendRequest } = this.props;
    return (
      <Fragment>
        <h2>Releases</h2>
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
