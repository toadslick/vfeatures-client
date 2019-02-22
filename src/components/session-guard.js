import React, { Component } from 'react';
import { Provider, Subscribe } from 'unstated';
import Session from '../containers/session';

class SessionGuard extends Component {
  render() {
    const { renderWhenLoggedIn, renderWhenLoggedOut } = this.props;
    return (
      <Provider>
        <Subscribe to={ [Session] }>
          { session => {
            if (session.isLoggedIn()) {
              return renderWhenLoggedIn(session);
            } else {
              return renderWhenLoggedOut(session);
            }
          }}
        </Subscribe>
      </Provider>
    );
  }
}

SessionGuard.defaultProps = {
  renderWhenLoggedIn: () => null,
  renderWhenLoggedOut: () => null,
};

export default SessionGuard;
