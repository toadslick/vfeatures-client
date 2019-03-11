import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { parse, stringify } from 'query-string';

const typeOptions = {
  'Feature': 'Feature',
  'Release': 'Release',
  'Silo': 'Silo',
  'Flag': 'Flag',
};

const actionOptions = {
  'Create': 'create',
  'Update': 'update',
  'Delete': 'destroy',
};

class ChangesQueryForm extends Component {
  state = {
    targetType: '',
    targetAction: '',
  }

  parseQueryParams(location) {
    const { type, action } = parse(location.search);
    this.setState({
      targetType: type || '',
      targetAction: action || '',
    });
  }

  componentWillMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.parseQueryParams.bind(this));
    this.parseQueryParams(window.location.search);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  inputChanged(key, e) {
    e.preventDefault();
    const { target: { value }} = e;
    this.setState({ [key]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    const { targetType, targetAction } = this.state;
    const query = {
      type: targetType || undefined,
      action: targetAction || undefined,
    };
    history.push({ pathname: '/history', search: stringify(query) });
  }

  renderOptions(options, prompt) {
    const elements = Object.keys(options).map(key => (
      <option key={ key } value={ options[key] }>{ key }</option>
    ));
    elements.unshift(<option key='' value=''>{ prompt }</option>);
    return elements;
  }

  render() {
    const { targetType, targetAction } = this.state;
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <fieldset>
          <legend>Filter History</legend>

          <label>
            <span>Type</span>
            <select
              value={ targetType }
              onChange={ this.inputChanged.bind(this, 'targetType') }
            >
              { this.renderOptions(typeOptions, 'Choose a type of record...') }
            </select>
          </label>

          <label>
            <span>Action</span>
            <select
              value={ targetAction }
              onChange={ this.inputChanged.bind(this, 'targetAction') }
            >
              { this.renderOptions(actionOptions, 'Choose a type of action...') }
            </select>
          </label>

          <button>Filter History</button>

          <p>
            <Link to='/history'>Clear Filter</Link>
          </p>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(ChangesQueryForm);
