import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import RequestResult from '../request-result';
import RequestForm from '../request-form';

class FeaturesList extends Component {

  renderResult([ value ]) {
    const listItems = value.map(({ id, key }) =>
      <li key={ key }>
        <Link to={ `/features/${id}` }>
          { key }
        </Link>
      </li>
    );
    return <ul>{ listItems }</ul>;
  }

  render() {
    const { request, sendRequest } = this.props;
    return (
      <main>
        <h2>Features</h2>
        <RequestResult requests={ [request] }>
          { this.renderResult.bind(this) }
        </RequestResult>
        <RequestForm
          url='/features'
          transform={ state => ({ feature: { ...state }}) }
          onFulfilled={ sendRequest }
          values={{ key: '' }}
          revealButtonContent='Create Feature'
        >
          { field => (
            <label>
              <span>Key</span>
              { field(
                <input
                  type='text'
                  name='key'
                  placeholder='Key'
                  autoComplete='off'/>
              )}
            </label>
          )}
        </RequestForm>
      </main>
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
