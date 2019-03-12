import React from 'react';
import { Link } from 'react-router-dom';


export default function FlagStatus(props) {
  const { id, enabled } = props.flag;
  if (enabled) {
    return (
      <Link
        to={ '/flags/' + id }
        className='flag-status flag-enabled'
      >on</Link>
    );
  } else {
    return (
      <Link
        to={ '/flags/' + id }
        className='flag-status flag-disabled'
      >off</Link>
    );
  }
}
