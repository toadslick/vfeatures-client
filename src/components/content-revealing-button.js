import React, { Component, createRef } from 'react';

// This component hides all of its children until the button is clicked.
// The children are passed a "hide" function that, when called,
// hides the children and displays the button again.
//
// This is so that multiple actions can call the "hide" function, such as
// submitting a form, clicking a "cancel" button, or clicking outside of a modal.

class ContentRevealingButton extends Component {

  constructor(props) {
    super(props);
    this.state = { contentVisible: false }
    this.focusRef = createRef();
  }

  showContent() {
    this.setState({ contentVisible: true });
    this.props.onReveal();

    // If an element has been assigned the `focusRef` as their ref,
    // assign focus to that element after the content has rendered.
    window.setTimeout(() => {
      this.focusRef.current && this.focusRef.current.focus();
    }, 0);
  }

  hideContent() {
    this.setState({ contentVisible: false });
    this.props.onHide();
  }

  render() {
    const { buttonContent, children } = this.props;
    const { contentVisible } = this.state;

    if (contentVisible) {
      return children(this.hideContent.bind(this), this.focusRef);
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

ContentRevealingButton.defaultProps = {
  onHide: () => {},
  onReveal: () => {},
};

export default ContentRevealingButton;
