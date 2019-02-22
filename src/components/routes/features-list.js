import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';
import config from '../../config';
import RequestWrapper from '../request/wrapper';

class FeaturesList extends Component {

  renderResults([ value ]) {
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
      <div>
        <h2>Features</h2>
        <RequestWrapper
          requests={ [request] }
          renderResults={ this.renderResults.bind(this) }
        />
      </div>
    );
  }
}

export default connect(() => ({
  request: `${config.apiRoot}/features`,
}))(FeaturesList);
