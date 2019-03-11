import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import session from '../../utils/unstated/session-connector';
import authorizedRequest from '../../utils/refetch/authorized-request';
import RequestResult from '../request-result';
import RequestFieldset from '../request-fieldset';
import ChangesForRecord from '../changes-for-record';

class FlagDetail extends Component {

  toggleClicked(e) {
    e.preventDefault();
    const {
      sendToggleRequest,
      request: { value: { enabled }},
    } = this.props;
    sendToggleRequest(!enabled);
  }

  renderResult([flag]) {
    const { id, enabled, feature, release } = flag;
    const { session, request } = this.props;

    return (
      <Fragment>
        <h2>
          { 'Flags / ' }
          <Link to={ '/releases/' + release.id }>
            { release.key }
          </Link>
          { ' / ' }
          <Link to={ '/features/' + feature.id }>
            { feature.key }
          </Link>
        </h2>
        <p>
          { enabled ? 'enabled' : 'disabled' }
        </p>
        { session.authorized() &&
          <RequestFieldset requests={ [request] }>
            <legend>Toggle Flag</legend>
            <button
              type='button'
              onClick= { this.toggleClicked.bind(this) }
            >
              { enabled ? 'Disable Flag' : 'Enable Flag' }
            </button>
          </RequestFieldset>
        }
        <ChangesForRecord type='Flag' id={ id } record={ flag }/>
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

export default session(connect(({ session, match: { params: { id }}}) => ({
    request: '/flags/' + id,
    sendToggleRequest: enabled => ({
      request: authorizedRequest(session, {
        url: '/flags/' + id,
        method: 'PUT',
        body: JSON.stringify({ flag: { enabled }}),
      }),
    }),
}))(FlagDetail));
