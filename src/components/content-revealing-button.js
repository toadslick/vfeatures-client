import React, { Component } from 'react';

// This component hides all of its children until the button is clicked.
// The children are passed a "hide" function that, when called,
// hides the children and displays the button again.
//
// This is so that multiple actions can call the "hide" function, such as
// submitting a form, clicking a "cancel" button, or clicking outside of a modal.

export default class ContentRevealingButton extends Component {
  state = { contentVisible: false }

  showContent() {
    this.setState({ contentVisible: true });
  }

  hideContent() {
    this.setState({ contentVisible: false });
  }

  render() {
    const { buttonContent, children } = this.props;
    const { contentVisible } = this.state;

    if (contentVisible) {
      return children(this.hideContent.bind(this));
    } else {
      return (
        <button
          type='buttpn'
          onClick={ this.showContent.bind(this) }
        >
          { buttonContent }
        </button>
      );
    }
  }
}
