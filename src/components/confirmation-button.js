import React, { Component } from 'react';

class ConfirmationButton extends Component {
  state = {
    confirming: false,
    confirmValue: '',
  }

  confirm(e) {
    this.setState({
      confirming: true,
      confirmValue: '',
    });
  }

  cancel(e) {
    this.setState({
      confirming: false,
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

  renderButton() {
    const { children } = this.props;
    return (
      <button
        type='button'
        onClick={ this.confirm.bind(this) }
      >
        { children }
      </button>
    );
  }

  renderConfirmation() {
    const { value } = this.props;
    const { confirmValue } = this.state;
    return (
      <form onSubmit={ this.submit.bind(this) }>
        <p>
          { `Enter "${value}" to confirm.` }
        </p>
        <input
          type='text'
          value={ confirmValue }
          onChange={ this.input.bind(this, 'confirmValue') }
          placeholder='Enter value'
        />
        <button>Confirm</button>
        <button
          type='button'
          onClick={ this.cancel.bind(this) }
        >
          Cancel
        </button>
      </form>
    );
  }

  render() {
    const { confirming } = this.state;
    if (confirming) {
      return this.renderConfirmation();
    } else {
      return this.renderButton();
    }
  }
}

ConfirmationButton.defaultProps = {
  value: '',
  onConfirm: () => {},
};

export default ConfirmationButton;
