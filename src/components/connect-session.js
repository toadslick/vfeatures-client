import React from 'react';
import { Subscribe } from 'unstated';
import Session from '../containers/session';

// This higher-order component takes a component and adds the `session` to its
// props so that the component does not need to be wrapped in a <Subscribe>.
export default Component => props => (
  <Subscribe to={ [Session] }>
    { session => {
      // Pass the username and token as props so that, when either of them
      // change, it forces the subscribing component to re-render.
      const { username, token } = session.state;
      const sessionProps = {
        session,
        sessionUsername: username,
        sessionToken: token,
      };
      return <Component { ...props } { ...sessionProps }/>
    }}
  </Subscribe>
);
