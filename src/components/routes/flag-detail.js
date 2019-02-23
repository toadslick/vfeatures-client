import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import config from '../../config';
import RequestWrapper from '../request/wrapper';
import SessionGuard from '../session-guard';

class FlagDetail extends Component {

  toggleClicked(enabled, token, e) {
    e.preventDefault();
    const { toggle } = this.props;
    toggle(token, enabled);
  }

  renderWhenLoggedIn(enabled, { state: { token }}) {
    return (
      <button
        type='button'
        onClick= { this.toggleClicked.bind(this, !enabled, token) }
      >
        { enabled ? 'disable flag' : 'enable flag' }
      </button>
    );
  }

  renderResults([{ id, enabled, feature, release }]) {
    return (
      <div>
        <h2>
          Flag for {
          <Link to={ '/features/' + feature.id }>
            { feature.key }
          </Link>
          } on {
          <Link to={ '/releases/' + release.id }>
            { release.key }
          </Link> }
        </h2>
        <p>
          { enabled ? 'enabled' : 'disabled' }
        </p>
        <SessionGuard
          renderWhenLoggedIn={ this.renderWhenLoggedIn.bind(this, enabled) }
        />
      </div>
    );
  }

  render() {
    const { request } = this.props;
    return (
      <RequestWrapper
        requests= { [request] }
        renderResults={ this.renderResults.bind(this) }
      />
    );
  }
}

export default connect(({ match: { params: { id }}}) => {
  const url = `${config.apiRoot}/flags/${id}`;
  return {
    request: url,
    toggle: (token, enabled) => ({
      request: {
        url,
        method: 'PUT',
        body: JSON.stringify({
          flag: { enabled },
        }),
        headers: {
          authorization: token,
        },
      },
    }),
  };
})(FlagDetail);
