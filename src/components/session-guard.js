import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import Session from '../containers/session';

class SessionGuard extends Component {
  render() {
    const { renderWhenLoggedIn, renderWhenLoggedOut } = this.props;
    return (
      <Subscribe to={ [Session] }>
        { session => {
          if (session.authorized()) {
            return renderWhenLoggedIn(session);
          } else {
            return renderWhenLoggedOut(session);
          }
        }}
      </Subscribe>
    );
  }
}

SessionGuard.defaultProps = {
  renderWhenLoggedIn: () => null,
  renderWhenLoggedOut: () => null,
};

export default SessionGuard;
