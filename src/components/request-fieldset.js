import React, { Component } from 'react';
import { PromiseState } from 'react-refetch';

const pendingClass = 'fieldset-busy';
const rejectedClass = 'fieldset-error';

// The purpose of this component is to disable all the elements in a form
// while a request is being made. The correct way to do that in HTML is to
// wrap the elements in a <fieldset> tag with a `disabled` property.
//
// This component checks the state of of an array of requests and disables
// the form if any of those requests are pending.
//
// It also sets an HTML class on the fieldset depending on whether any
// requests are pending or rejected.
class Fieldset extends Component {

  render () {
    const { requests, children } = this.props;

    // React-refetch requests are not defined until after they're called.
    // Ignore any request props that are undefined.
    const existingRequests = requests.filter(request => request);
    const { pending, rejected } = PromiseState.all(existingRequests);

    let disabled = false;
    let className = '';

    if (pending) {
      disabled = true;
      className = pendingClass;
    } else if (rejected) {
      className = rejectedClass;
    }

    return (
      <fieldset
        disabled={ disabled }
        className={ className }
      >
        { children }
      </fieldset>
    );
  }
}

Fieldset.defaultProps = {
  requests: [],
};

export default Fieldset;
