import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import session from '../../utils/unstated/session-connector';
import authorizedRequest from '../../utils/refetch/authorized-request';
import RequestResult from '../request-result';
import RequestFieldset from '../request-fieldset';

class FlagDetail extends Component {

  toggleClicked(e) {
    e.preventDefault();
    const {
      sendToggleRequest,
      request: { value: { enabled }},
    } = this.props;
    sendToggleRequest(!enabled);
  }

  renderResult([{ id, enabled, feature, release }]) {
    const { session, request } = this.props;
    return (
      <Fragment>
        <h2>
          Flags / <Link to={ '/features/' + feature.id }>
            { feature.key }
          </Link> / <Link to={ '/releases/' + release.id }>
            { release.key }
          </Link>
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
              { enabled ? 'Disable Flag' : 'Enable Flag' }
            </button>
          </RequestFieldset>
        }
      </Fragment>
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
    session,
  } = props;

  const url = `/flags/${ id }`;

  return {
    request: url,
    sendToggleRequest: enabled => ({
      request: authorizedRequest(session, {
        url,
        method: 'PUT',
        body: JSON.stringify({ flag: { enabled }}),
      }),
    }),
  };
})(FlagDetail));
