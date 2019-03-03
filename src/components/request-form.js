import React, { Component, Fragment, cloneElement } from 'react';

import session from '../utils/unstated/session-connector';
import connect from '../utils/refetch/api-connector';
import authorizedRequest from '../utils/refetch/authorized-request';
import RequestFieldset from './request-fieldset';
import ContentRevealingButton from './content-revealing-button';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = props.values;
  }

  submit(hideContent, e) {
    e.preventDefault();
    const {
      sendRequest,
      transform,
      method,
      onFulfilled,
    } = this.props;
    sendRequest(method, transform(this.state), () => {
      hideContent();
      onFulfilled();
    });
  }

  reset() {
    this.setState(this.props.values);
  }

  inputChanged(key, e) {
    e.preventDefault();
    const { target: { value }} = e;
    this.setState({ [key]: value });
  }

  addField(element) {
    const { props: { children, name }} = element;
    const props = {
      onChange: this.inputChanged.bind(this, name),
      value: this.state[name],
    };
    return cloneElement(element, props, children);
  }

  render() {
    const {
      session,
      request,
      children,
      submitButtonContent,
      revealButtonContent,
      cancelButtonContent,
    } = this.props;

    if (!session.authorized()) { return null; }

    return (
      <RequestFieldset requests={ [request] }>
        <ContentRevealingButton onReveal={ this.reset.bind(this) } buttonContent={ revealButtonContent }>
          { hideContent => (
            <form onSubmit={ this.submit.bind(this, hideContent) }>
              <Fragment>
                { children(this.addField.bind(this)) }
                <button>{ submitButtonContent }</button>
                <button
                  type='button'
                  onClick={ () => hideContent() || this.reset() }
                >{ cancelButtonContent }</button>
              </Fragment>
            </form>
          )}
        </ContentRevealingButton>
      </RequestFieldset>
    );
  }
}

Form.defaultProps = {
  submitButtonContent: 'Submit',
  revealButtonContent: 'Manage',
  cancelButtonContent: 'Cancel',
  transform: state => state,
  method: 'POST',
  url: '',
  onFulfilled: () => {},
};

// TODO: figure out why this happens:
// `method` cannot be passed as a prop in the function that is the argument of `connect()`.
// When attempting to access it that way, it's value is `undefined`.
// However, it CAN be passed in the `sendRequest()` function.
export default session(connect(({ session, url }) => ({
  request: { value: '' },
  sendRequest: (method, body, onFulfilled) => ({
    request: authorizedRequest(session, {
      url,
      method,
      body: JSON.stringify(body),
      then: onFulfilled,
    }),
  }),
}))(Form));
