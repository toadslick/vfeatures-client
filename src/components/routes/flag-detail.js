import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Link } from 'react-router-dom';

import config from '../../config';
import session from '../connect-session';
import RequestResult from '../request/result';
import RequestFieldset from '../request/fieldset';

class FlagDetail extends Component {

  toggleClicked(e) {
    e.preventDefault();
    const {
      toggle,
      request: { value: { enabled }},
    } = this.props;
    toggle(!enabled);
  }

  renderResult([{ id, enabled, feature, release }]) {
    const { session, request } = this.props;
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
        { session.authorized() &&
          <RequestFieldset requests={ [request] }>
            <button
              type='button'
              onClick= { this.toggleClicked.bind(this) }
            >
              { enabled ? 'disable flag' : 'enable flag' }
            </button>
          </RequestFieldset>
        }
      </div>
    );
  }

  render() {
    const { request } = this.props;
    return (
      <RequestResult requests={ [request] }>
        { this.renderResult.bind(this) }
      </RequestResult>
    );
  }
}

export default session(connect(props => {
  const {
    match: { params: { id }},
    session: { state: { token }},
  } = props;
  const url = `${config.apiRoot}/flags/${id}`;
  return {
    request: url,
    toggle: enabled => ({
      request: {
        url,
        method: 'PUT',
        body: JSON.stringify({ flag: { enabled }}),
        headers: { authorization: token },
      },
    }),
  };
})(FlagDetail));
