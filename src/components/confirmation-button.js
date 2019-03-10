import React, { Component } from 'react';
import ContentRevealingButton from './content-revealing-button';

class ConfirmationButton extends Component {
  state = {
    confirmValue: '',
  }

  reset() {
    this.setState({
      confirmValue: '',
    });
  }

  input(propName, e) {
    const { target: { value }} = e;
    this.setState({
      [propName]: value,
    });
  }

  submit(e) {
    e.preventDefault();
    const { value, onConfirm } = this.props;
    const { confirmValue } = this.state;
    if (value === confirmValue) {
      onConfirm();
    }
  }

  render() {
    const { value, children } = this.props;
    const { confirmValue } = this.state;
    return (
      <ContentRevealingButton buttonContent={ children }>
        { (hideContent, focusRef) => (
          <form onSubmit={ this.submit.bind(this) }>
            <p>
              { `Enter "${value}" to confirm.` }
            </p>
            <input
              type='text'
              value={ confirmValue }
              onChange={ this.input.bind(this, 'confirmValue') }
              placeholder='Enter value'
              ref={ focusRef }
            />
            <button>Confirm</button>
            <button
              type='button'
              onClick={ () => this.reset() || hideContent() }
            >
              Cancel
            </button>
          </form>
        )}
      </ContentRevealingButton>
    );
  }
}

ConfirmationButton.defaultProps = {
  value: '',
  onConfirm: () => {},
};

export default ConfirmationButton;
