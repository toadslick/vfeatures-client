import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';
import config from '../../config';
import RequestResult from '../request/result';

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
    const { request } = this.props;
    return (
      <main>
        <h2>Features</h2>
        <RequestResult requests={ [request] }>
          { this.renderResult.bind(this) }
        </RequestResult>
      </main>
    );
  }
}

export default connect(() => ({
  request: `${config.apiRoot}/features`,
}))(FeaturesList);
