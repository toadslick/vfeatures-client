import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import connect from '../utils/refetch/api-connector';
import session from '../utils/unstated/session-connector';
import authorizedRequest from '../utils/refetch/authorized-request';
import ConfirmationButton from './confirmation-button';
import RequestFieldset from './request-fieldset';

class DeleteButton extends Component {
  render() {
    const {
      session,
      children,
      request,
      sendRequest,
      redirectURL,
      value,
      legend,
    } = this.props;

    if (!session.authorized()) { return null; }

    if (redirectURL && request && request.fulfilled) {
      return <Redirect to={ redirectURL }/>;
    }

    return (
      <RequestFieldset requests={ [request] }>
        { legend && <legend>{ legend }</legend> }
        <ConfirmationButton
          value={ value }
          onConfirm={ sendRequest }
        >
          { children }
        </ConfirmationButton>
      </RequestFieldset>
    );
  }
}

DeleteButton.defaultProps = {
  requestURL: '',
  redirectURL: '',
  request: null,
  legend: 'Delete',
};

export default session(connect(({ requestURL, session }) => ({
  sendRequest: () => ({
    request: authorizedRequest(session, {
      url: requestURL,
      method: 'DELETE',
    }),
  }),
}))(DeleteButton));
