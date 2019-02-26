import React, { Component, Fragment } from 'react';

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
      return (
        <Fragment>
          { children(this.hideContent.bind(this)) }
        </Fragment>
      );
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
