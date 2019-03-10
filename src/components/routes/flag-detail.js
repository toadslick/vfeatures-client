import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import connect from '../../utils/refetch/api-connector';
import session from '../../utils/unstated/session-connector';
import authorizedRequest from '../../utils/refetch/authorized-request';
import RequestResult from '../request-result';
import RequestFieldset from '../request-fieldset';
import ChangesList from '../changes-for-record';

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
      </Fragment>
    );
  }

  render() {
    const {
      request,
      match: { params: { id }},
    } = this.props;
    return (
      <Fragment>
        <RequestResult requests={ [request] }>
          { this.renderResult.bind(this) }
        </RequestResult>
        <ChangesList type='Flag' id={ id }/>
      </Fragment>
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
