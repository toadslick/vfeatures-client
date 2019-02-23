import React from 'react';
import { Subscribe } from 'unstated';
import Session from '../containers/session';

export default Component => props => (
  <Subscribe to={ [Session] }>
    { session => {
      // Pass the username and token as props so that, when either of them
      // change, it forces the subscribing component to re-render.
      const { username, token } = session.state;
      const sessionProps = {
        session,
        username,
        token,
      };
      return <Component { ...props } { ...sessionProps }/>
    }}
  </Subscribe>
);
