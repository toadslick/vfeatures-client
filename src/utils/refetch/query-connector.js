import React from 'react';
import { parse } from 'query-string';

export default Component => props => {
  const queryString = window.location.search;
  const queryProps = {
    queryString,
    queryParams: parse(queryString),
  };
  return <Component { ...props } { ...queryProps }/>
};
